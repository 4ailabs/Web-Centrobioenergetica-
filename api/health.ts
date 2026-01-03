import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Test database connection
    await prisma.$connect();

    // Count users
    const userCount = await prisma.user.count();

    return res.json({
      status: 'ok',
      database: 'connected',
      userCount,
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV,
      }
    });
  } catch (error: any) {
    console.error('Health check failed:', error);
    return res.status(500).json({
      status: 'error',
      error: error.message,
      code: error.code,
    });
  } finally {
    await prisma.$disconnect();
  }
}
