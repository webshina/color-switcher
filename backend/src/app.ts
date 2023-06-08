import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { startDiscordBot } from './eventListeners/discord';
import { router } from './routes';

const ENV_PATH = path.join(__dirname, '../.env.development');
dotenv.config({ path: ENV_PATH });
const LOCAL_ENV_PATH = path.join(__dirname, '../.env.development.local');
dotenv.config({ path: LOCAL_ENV_PATH });

const app = express();
const port = 3005;

// Discord Bot
startDiscordBot();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
