import express from 'express';
import { prisma } from '../../lib/prisma';

const router = express.Router();

// Obtener eventos del calendario
router.get('/', async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'asc' },
        });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Error al obtener eventos' });
    }
});

export default router;
