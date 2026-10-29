/**
 * Vercel serverless entry point.
 * vercel.json rewrites /api/* to this function; Express then routes the original URL.
 */
import app from '../server/app.js';

export default app;
