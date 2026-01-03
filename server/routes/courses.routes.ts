import express from 'express';
import { prisma } from '../../lib/prisma.js';

const router = express.Router();

// Obtener todos los cursos
router.get('/', async (req, res) => {
    try {
        const courses = await prisma.course.findMany({
            include: {
                modules: {
                    include: {
                        videos: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Error al obtener cursos' });
    }
});

// Obtener un curso por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const course = await prisma.course.findUnique({
            where: { id: parseInt(id) },
            include: {
                modules: {
                    include: {
                        videos: true,
                    },
                },
            },
        });

        if (!course) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Error al obtener el curso' });
    }
});

export default router;
