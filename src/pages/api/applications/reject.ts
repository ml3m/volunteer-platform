import { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore - Ignoring PrismaClient type issues
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
// @ts-ignore
import jwt from 'jsonwebtoken';

// @ts-ignore - Ignoring PrismaClient property access TypeScript errors
const prisma = new PrismaClient();

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
  console.log('Reject API called:', {
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
    
    // First try NextAuth session
    const session = await getServerSession(req, res, authOptions);
    
    if (session && session.user.role === 'ADMIN') {
      isAuthorized = true;
    } else {
      // Fallback to JWT token auth
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
    }
    
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { applicationId } = req.body;
    
    console.log('Processing application rejection:', applicationId);

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

    // Update application status - Note: Prisma model names are lowercase
    // @ts-ignore - TypeScript doesn't recognize the Prisma schema models
    await prisma.application.update({
      where: { id: applicationId },
      data: { status: 'REJECTED' },
    });

    console.log('Application status updated to REJECTED');

    return res.status(200).json({
      message: 'Application rejected successfully',
    });
  } catch (error) {
    console.error('Error rejecting application:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    });
  } finally {
    await prisma.$disconnect();
  }
} 