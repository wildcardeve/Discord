const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');

const logDir = 'logs';
const { combine, timestamp, printf } = format;

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// eslint-disable-next-line no-shadow
const formattedLoggingTemplate = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    formattedLoggingTemplate,
  ),
  transports: [
    new transports.DailyRotateFile({ level: 'error', filename: `${logDir}/error-%DATE%.log`, zippedArchive: true }),
    new transports.DailyRotateFile({ level: 'info', filename: `${logDir}/application-%DATE%.log`, zippedArchive: true }),
  ],
});

module.exports = logger;
