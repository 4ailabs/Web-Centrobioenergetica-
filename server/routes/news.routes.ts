import express from 'express';
import { prisma } from '../../lib/prisma';

const router = express.Router();

// Obtener noticias
router.get('/', async (req, res) => {
    try {
        const news = await prisma.newsArticle.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error al obtener noticias' });
    }
});

// Reaccionar a una noticia
router.post('/:id/react', async (req, res) => {
    try {
        const { id } = req.params;
        const { reaction } = req.body;

        if (!reaction) {
            return res.status(400).json({ error: 'Reacción requerida' });
        }

        const article = await prisma.newsArticle.findUnique({
            where: { id: parseInt(id) },
        });

        if (!article) {
            return res.status(404).json({ error: 'Noticia no encontrada' });
        }

        const reactions = (article.reactions as Record<string, number>) || {};
        reactions[reaction] = (reactions[reaction] || 0) + 1;

        const updated = await prisma.newsArticle.update({
            where: { id: parseInt(id) },
            data: { reactions },
        });

        res.json(updated);
    } catch (error) {
        console.error('Error processing reaction:', error);
        res.status(500).json({ error: 'Error al procesar reacción' });
    }
});

export default router;
