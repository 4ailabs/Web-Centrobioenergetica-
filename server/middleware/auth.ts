import express from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware para verificar autenticación
export const authenticateToken = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: string;
            email: string;
            isAdmin: boolean;
        };

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, name: true, isAdmin: true, approved: true },
        });

        if (!user || !user.approved) {
            return res.status(401).json({ error: 'User not approved or not found' });
        }

        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Middleware para verificar que es admin
export const requireAdmin = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const user = (req as any).user;
    if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};
