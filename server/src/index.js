import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/apiRoutes.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { store } from './models/store.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite client
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// High-capacity body parsers for multimodal base64 image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve demo assets and uploads
app.use('/demo', express.static(path.join(__dirname, '../../client/public/demo')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Lightweight request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(`[HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${elapsed}ms)`);
  });
  next();
});

// Mount API routes
app.use('/api', apiRoutes);

// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'CampusLens Core API Server',
    status: 'online',
    version: '1.0.0',
    documentation: {
      health: '/api/health',
      aiIntent: 'POST /api/ai/intent',
      lostLens: 'POST /api/lostlens/lost, POST /api/lostlens/found, POST /api/lostlens/match',
      events: 'GET /api/events, POST /api/events/recommend',
      campusFix: 'GET /api/campusfix, POST /api/campusfix/triage, POST /api/campusfix'
    }
  });
});

// Centralized error handler
app.use(errorHandler);

async function startServer() {
  await connectDB();
  await store.syncWithDatabase();
  app.listen(PORT, () => {
    console.log(`[CampusLens] Server actively running on http://localhost:${PORT}`);
    console.log(`[CampusLens] API endpoints ready at http://localhost:${PORT}/api`);
    console.log(`[CampusLens] Health check at http://localhost:${PORT}/api/health`);
  });
}

startServer();

