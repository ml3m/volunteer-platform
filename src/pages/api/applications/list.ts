import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
// @ts-ignore
import jwt from 'jsonwebtoken';

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
  if (req.method !== 'GET') {
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

    // Get all applications, sorted by creation date (newest first)
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 