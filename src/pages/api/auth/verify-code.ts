import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { code, email } = req.body;

    // Validate input
    if (!code || !email) {
      return res.status(400).json({ message: 'Verification code and email are required' });
    }

    // Find the verification code
    const verificationCode = await prisma.verificationCode.findUnique({
      where: { code },
      include: {
        application: true,
      },
    });

    if (!verificationCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Check if code is expired
    if (new Date() > verificationCode.expiresAt) {
      return res.status(400).json({ message: 'Verification code has expired' });
    }

    // Check if code has been used
    if (verificationCode.used) {
      return res.status(400).json({ message: 'Verification code has already been used' });
    }

    // Check if email matches
    if (verificationCode.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(400).json({ message: 'Email does not match the verification code' });
    }

    // Check if application is approved
    if (verificationCode.application.status !== 'APPROVED') {
      return res.status(400).json({ message: 'Your application has not been approved yet' });
    }

    // Mark code as verified but don't mark as used yet
    // It will be marked as used when the user actually registers
    
    return res.status(200).json({
      message: 'Verification code is valid',
      applicationId: verificationCode.application.id,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 