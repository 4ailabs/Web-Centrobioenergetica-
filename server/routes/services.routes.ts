import express from 'express';
import { prisma } from '../../lib/prisma';

const router = express.Router();

// Obtener servicios
router.get('/', async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Error al obtener servicios' });
    }
});

export default router;
