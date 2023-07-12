import * as Sentry from '@sentry/node';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { localStoragePath } from './config/config';
import { startDiscordBot } from './eventListeners/discord';
import { router } from './routes';

// env
dotenv.config({ path: path.join(__dirname, '../.env.development') });
dotenv.config({ path: path.join(__dirname, '../.env.development.local') });

// Discord Bot
startDiscordBot();

// Express
const app = express();
const port = 3005;

// Sentry
Sentry.init({
  dsn: 'https://14f4e779fdb14e2f961be5070c9cbb3b@o4505023359549440.ingest.sentry.io/4505519110619136',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// Static files
app.use(express.static(localStoragePath));

app.use('/', router);

// Sentry error handler should be after all controllers
app.use(Sentry.Handlers.errorHandler());

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
