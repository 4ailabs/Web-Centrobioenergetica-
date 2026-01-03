import express from 'express';
import { usersService } from '../services/users.service';
import { enrollmentService } from '../services/enrollment.service';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// All routes require authentication and admin privileges
router.use(authenticateToken, requireAdmin);

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Crear usuario
router.post('/', async (req, res) => {
    try {
        const { email, password, name, isAdmin, subscriptionStatus } = req.body;
        const newUser = await usersService.createUser({
            email,
            password,
            name,
            isAdmin,
            subscriptionStatus,
        });
        res.json(newUser);
    } catch (error: any) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message || 'Error al crear usuario' });
    }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, isAdmin, subscriptionStatus } = req.body;
        const updatedUser = await usersService.updateUser(id, {
            name,
            email,
            isAdmin,
            subscriptionStatus,
        });
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usersService.deleteUser(id);
        res.json(result);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

// Actualizar suscripción
router.put('/:id/subscription', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedUser = await usersService.updateSubscription(id, status);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ error: 'Error al actualizar suscripción' });
    }
});

// Actualizar cursos
router.put('/:id/courses', async (req, res) => {
    try {
        const { id } = req.params;
        const { courseIds } = req.body;
        const result = await enrollmentService.updateUserCourses(id, courseIds);
        res.json(result);
    } catch (error) {
        console.error('Error updating courses:', error);
        res.status(500).json({ error: 'Error al actualizar cursos' });
    }
});

export default router;
