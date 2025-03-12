import { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore - Ignoring PrismaClient type issues
import { PrismaClient } from '@prisma/client';
// We'll remove the NextAuth imports for now since they're causing issues
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
  console.log('List Applications API called:', {
    method: req.method,
    headers: {
      auth: !!req.headers.authorization,
    },
  });

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let isAuthorized = false;
    
    // We'll primarily rely on JWT token auth now
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

    // Get all applications, sorted by creation date (newest first) - Note: Prisma model names are lowercase
    // @ts-ignore - TypeScript doesn't recognize the Prisma schema models
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`Found ${applications.length} applications`);
    
    return res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    });
  } finally {
    await prisma.$disconnect();
  }
} 