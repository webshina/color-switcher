import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import winston from 'winston';
import { localStoragePath } from './config/config';
import { router } from './routes';

// env
dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});
dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}.local`),
});

// Set up Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'discord-home' },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
    }),
  ],
});

// Express
const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
  'http://localhost:3004',
  'https://favo-community.com',
  'https://www.favo-community.com',
];

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error(
            'The CORS policy for this site does not allow access from the specified Origin.'
          ),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(cookieParser());

// Static files
app.use(express.static(localStoragePath));

// router & controllers
app.use('/', router);

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  logger.error(err);
});

// Start the server
const port = 3005;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
