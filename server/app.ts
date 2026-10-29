/**
 * Express application (API only).
 * No listen() and no Vite here, so it can be used by:
 *  - server.ts      (local dev / Docker / any long-running Node host)
 *  - api/index.ts   (Vercel serverless function)
 */

import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { apiRouter } from './apiRouter.js';

const app = express();

app.use(express.json());

// Mount versioned REST API
app.use('/api/v1', apiRouter);

// Quick API documentation / overview route
app.get('/api/docs', (_req: Request, res: Response) => {
  res.json({
    title: 'AICTE Institution-Centric Case Intelligence API',
    version: 'v1',
    endpoints: [
      'POST /api/v1/auth/login',
      'GET /api/v1/auth/me',
      'GET /api/v1/health',
      'GET /api/v1/dashboard',
      'GET /api/v1/cases',
      'POST /api/v1/cases',
      'GET /api/v1/cases/:id',
      'PATCH /api/v1/cases/:id/status',
      'PATCH /api/v1/cases/:id/reassign',
      'PATCH /api/v1/cases/:id/transfer',
      'POST /api/v1/cases/:id/notes',
      'GET /api/v1/institutions',
      'GET /api/v1/institutions/:id',
      'GET /api/v1/linking/suggestions',
      'POST /api/v1/linking/compare',
      'POST /api/v1/linking/suggestions/:id/review',
      'GET /api/v1/conflicts',
      'PATCH /api/v1/conflicts/:id/status',
      'GET /api/v1/severity/queue',
      'POST /api/v1/severity/evaluate',
      'POST /api/v1/severity/override',
      'GET /api/v1/graph',
      'GET /api/v1/workflows/deadlines',
      'GET /api/v1/notifications',
      'GET /api/v1/audit-logs',
    ],
  });
});

// Unknown /api/* routes return JSON 404 (never the SPA's index.html)
app.use('/api', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'API route not found' });
});

// Last-resort error handler so failures return JSON instead of crashing
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled API error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
