import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

// Function to generate a random 8-character code
const generateVerificationCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(req, res, authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { applicationId } = req.body;

    if (!applicationId) {
      return res.status(400).json({ message: 'Application ID is required' });
    }

    // Find the application
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.status !== 'PENDING') {
      return res.status(400).json({ message: 'Application has already been processed' });
    }

    // Generate verification code
    const code = generateVerificationCode();
    
    // Set expiration date (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Update application status and create verification code
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: 'APPROVED',
        verificationCode: {
          create: {
            code,
            email: application.email,
            expiresAt,
          },
        },
      },
      include: {
        verificationCode: true,
      },
    });

    // In a real application, you would send an email with the verification code here
    // For now, we'll just return it in the response
    
    return res.status(200).json({
      message: 'Application approved successfully',
      verificationCode: updatedApplication.verificationCode.code,
      email: application.email,
    });
  } catch (error) {
    console.error('Application approval error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 