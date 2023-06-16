import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
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

// Static files
app.use(express.static(path.join(__dirname, '../storage')));

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
