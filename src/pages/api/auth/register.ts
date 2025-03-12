import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password, role, verificationCode } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // For volunteer role, verify the code
    if (role === 'VOLUNTEER' && !verificationCode) {
      return res.status(400).json({ message: 'Verification code is required for volunteer registration' });
    }

    let applicationId = null;

    if (role === 'VOLUNTEER') {
      // Find the verification code
      const verification = await prisma.verificationCode.findUnique({
        where: { code: verificationCode },
        include: {
          application: true,
        },
      });

      if (!verification) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }

      // Check if code is expired
      if (new Date() > verification.expiresAt) {
        return res.status(400).json({ message: 'Verification code has expired' });
      }

      // Check if code has been used
      if (verification.used) {
        return res.status(400).json({ message: 'Verification code has already been used' });
      }

      // Check if email matches
      if (verification.email.toLowerCase() !== email.toLowerCase()) {
        return res.status(400).json({ message: 'Email does not match the verification code' });
      }

      // Check if application is approved
      if (verification.application.status !== 'APPROVED') {
        return res.status(400).json({ message: 'Your application has not been approved yet' });
      }

      applicationId = verification.application.id;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'VOLUNTEER',
      },
    });

    // If this is a volunteer with a verified application, link the user to the application
    // and mark the verification code as used
    if (applicationId) {
      await prisma.application.update({
        where: { id: applicationId },
        data: {
          userId: user.id,
        },
      });

      await prisma.verificationCode.update({
        where: { applicationId },
        data: {
          used: true,
        },
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
