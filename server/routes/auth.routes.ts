import express from 'express';
import { authService } from '../services/auth.service.js';

const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const result = await authService.registerUser({ email, password, name });
        return res.status(201).json(result);
    } catch (error: any) {
        console.error('Error registering user:', error);
        return res.status(400).json({
            error: error.message || 'Error al registrar usuario. Por favor, intenta de nuevo.',
        });
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const result = await authService.loginUser({ email, password });
        return res.json(result);
    } catch (error: any) {
        console.error('Error logging in:', error);
        const statusCode = error.message.includes('pendiente') ? 403 : 401;
        return res.status(statusCode).json({ error: error.message || 'Error al iniciar sesión' });
    }
});

// Ruta para diagnóstico
router.post('/auth/diagnose', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email es requerido' });
        }

        const result = await authService.diagnoseCredentials(email, password);
        return res.json(result);
    } catch (error: any) {
        console.error('Error diagnosing:', error);
        return res.status(500).json({ error: 'Error al diagnosticar' });
    }
});

// Ruta para verificar el token actual
router.get('/auth/me', async (req, res) => {
    // This route needs authenticateToken middleware applied in main server
    return res.json({ user: (req as any).user });
});

export default router;
