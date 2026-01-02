import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Middleware para verificar autenticación
const authenticateToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; isAdmin: boolean };
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
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const user = (req as any).user;
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Ruta de registro
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Validar contraseña: mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números',
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'El formato del email no es válido' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario (approved = false por defecto)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        approved: false, // Usuario pendiente de aprobación
      },
      select: {
        id: true,
        email: true,
        name: true,
        approved: true,
      },
    });

    return res.status(201).json({
      message: 'Registro exitoso. Tu cuenta está pendiente de aprobación por un administrador.',
      user,
    });
  } catch (error: any) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      error: 'Error al registrar usuario. Por favor, intenta de nuevo.',
    });
  }
});

// Ruta de login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar que el usuario esté aprobado
    if (!user.approved) {
      return res.status(403).json({
        error: 'Tu cuenta está pendiente de aprobación por un administrador.',
      });
    }

    // Generar JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error: any) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Ruta para verificar el token actual
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  return res.json({ user: (req as any).user });
});

// --- Rutas de Contenido ---

// Obtener todos los cursos
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            videos: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
});

// Obtener un curso por ID
app.get('/api/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: {
        modules: {
          include: {
            videos: true
          }
        }
      }
    });
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
});

// Obtener servicios
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

// Obtener noticias
app.get('/api/news', async (req, res) => {
  try {
    const news = await prisma.newsArticle.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
});

// Reaccionar a una noticia
app.post('/api/news/:id/react', async (req, res) => {
  try {
    const { id } = req.params;
    const { reaction } = req.body; // ej: "love", "useful", "wow"

    if (!reaction) return res.status(400).json({ error: 'Reacción requerida' });

    const article = await prisma.newsArticle.findUnique({ where: { id: parseInt(id) } });
    if (!article) return res.status(404).json({ error: 'Noticia no encontrada' });

    const reactions = (article.reactions as Record<string, number>) || {};
    reactions[reaction] = (reactions[reaction] || 0) + 1;

    const updated = await prisma.newsArticle.update({
      where: { id: parseInt(id) },
      data: { reactions }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar reacción' });
  }
});

// Obtener eventos del calendario
app.get('/api/events', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

// Ruta para diagnóstico (similar a app-ei)
app.post('/api/auth/diagnose', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.json({
        userExists: false,
        message: 'El email no está registrado.',
        action: 'Por favor, regístrate primero.',
      });
    }

    if (!user.approved) {
      return res.json({
        userExists: true,
        isApproved: false,
        message: 'Tu cuenta está pendiente de aprobación.',
        action: 'Un administrador debe aprobar tu cuenta antes de poder iniciar sesión.',
      });
    }

    if (!user.password) {
      return res.json({
        userExists: true,
        isApproved: true,
        hasPassword: false,
        message: 'Tu cuenta no tiene contraseña configurada.',
        action: 'Contacta al administrador para configurar tu contraseña.',
      });
    }

    const isPasswordValid = password ? await bcrypt.compare(password, user.password) : false;

    if (!isPasswordValid) {
      return res.json({
        userExists: true,
        isApproved: true,
        hasPassword: true,
        isPasswordValid: false,
        message: 'La contraseña es incorrecta.',
        action: 'Por favor, verifica tu contraseña e intenta de nuevo.',
      });
    }

    return res.json({
      userExists: true,
      isApproved: true,
      hasPassword: true,
      isPasswordValid: true,
      message: 'Las credenciales son válidas.',
    });
  } catch (error: any) {
    console.error('Error diagnosing:', error);
    return res.status(500).json({ error: 'Error al diagnosticar' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

