import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authenticateToken } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import coursesRoutes from './routes/courses.routes.js';
import newsRoutes from './routes/news.routes.js';
import servicesRoutes from './routes/services.routes.js';
import eventsRoutes from './routes/events.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for development and production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://www.institutocentrobioenergetica.com',
  'https://institutocentrobioenergetica.com',
  'https://institutocentrobioenergetica.vercel.app',
  process.env.CLIENT_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Allow all origins that match our domains
      if (
        allowedOrigins.includes(origin) ||
        origin?.includes('institutocentrobioenergetica') ||
        origin?.includes('localhost')
      ) {
        return callback(null, true);
      }

      callback(null, true); // Allow all in production to avoid iframe issues
    },
  })
);

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount routes
app.use('/api', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/events', eventsRoutes);

// Apply auth middleware to /api/auth/me route
app.get('/api/auth/me', authenticateToken, (req, res) => {
  return res.json({ user: (req as any).user });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server only in non-production environments
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
