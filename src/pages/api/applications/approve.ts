import { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore - Ignoring PrismaClient type issues
import { PrismaClient } from '@prisma/client';
// We'll remove the NextAuth imports since they're causing issues
// and we're using JWT token authentication primarily
// @ts-ignore
import jwt from 'jsonwebtoken';
import { sendEmail, generateVerificationEmailContent } from '../../../utils/email';

// @ts-ignore - Ignoring PrismaClient property access TypeScript errors
const prisma = new PrismaClient();

// Function to generate a random 8-character code
const generateVerificationCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Function to verify JWT token
const verifyToken = (token: string): { id: string; role: string } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { 
      id: string;
      role: string;
    };
    return decoded;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Log request details for debugging
  console.log('Approve API called:', {
    method: req.method,
    body: req.body,
    headers: {
      auth: !!req.headers.authorization,
      contentType: req.headers['content-type'],
    },
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let isAuthorized = false;
    
    // We'll primarily rely on JWT token auth for now
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token) { // Check if token is defined
        const decoded = verifyToken(token);
        
        if (decoded && decoded.role === 'ADMIN') {
          isAuthorized = true;
        }
      }
    }
    
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { applicationId } = req.body;
    
    console.log('Processing application approval:', applicationId);

    if (!applicationId) {
      return res.status(400).json({ message: 'Application ID is required' });
    }

    // Find the application - Note: Prisma model names are lowercase
    // @ts-ignore - TypeScript doesn't recognize the Prisma schema models
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.status !== 'PENDING') {
      return res.status(400).json({ message: 'This application has already been processed' });
    }

    // Generate verification code
    const code = generateVerificationCode();
    const now = new Date();
    const expiresAt = new Date(now.setDate(now.getDate() + 7)); // Expires in 7 days

    console.log('Generated verification code:', code);

    try {
      // Update application status first - Note: Prisma model names are lowercase
      // @ts-ignore - TypeScript doesn't recognize the Prisma schema models
      await prisma.application.update({
        where: { id: applicationId },
        data: { status: 'APPROVED' },
      });
      
      console.log('Application status updated to APPROVED');

      // Then create verification code record - Note: Prisma model names are lowercase
      // @ts-ignore - TypeScript doesn't recognize the Prisma schema models
      await prisma.verificationCode.create({
        data: {
          code,
          email: application.email,
          expiresAt,
          application: {
            connect: {
              id: applicationId,
            },
          },
        },
      });
      
      console.log('Verification code created in database');
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ message: 'Database error: ' + (dbError instanceof Error ? dbError.message : String(dbError)) });
    }

    // Send verification email if email util is available
    try {
      console.log('Attempting to send email to:', application.email);
      
      if (typeof sendEmail === 'function' && typeof generateVerificationEmailContent === 'function') {
        const emailContent = generateVerificationEmailContent(application.name, code);
        const emailResult = await sendEmail({
          to: application.email,
          subject: emailContent.subject,
          html: emailContent.html
        });
        
        console.log('Email send result:', emailResult);
      } else {
        console.log('Email functions not available');
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue anyway - we don't want to fail the API call just because email sending failed
    }

    return res.status(200).json({
      message: 'Application approved successfully',
      verificationCode: code,
      email: application.email,
    });
  } catch (error) {
    console.error('Error approving application:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    });
  } finally {
    await prisma.$disconnect();
  }
} 