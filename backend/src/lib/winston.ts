import path from 'path';
import winston from 'winston';

// Format to combine a nicely printed timestamp with the rest of your log information
const customFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  }
);

// Set up Winston logger
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.label({ label: 'discord-home' }),
    winston.format.timestamp(), // This will add the timestamp
    customFormat
  ),
  defaultMeta: { service: 'discord-home' },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
    }),
  ],
});
