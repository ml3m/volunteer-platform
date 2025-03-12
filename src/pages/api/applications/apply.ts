import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, motivation, experience } = req.body;

    // Validate input
    if (!name || !email || !motivation) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if application already exists
    const existingApplication = await prisma.application.findUnique({
      where: { email },
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'An application with this email already exists' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        name,
        email,
        phone,
        motivation,
        experience,
        status: 'PENDING',
      },
    });

    return res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: application.id,
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 