import winston from "winston";
const { format } = winston;

const logger = winston.createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.splat(),
    format.metadata({ fillExcept: ["message", "level", "timestamp"] }),
  ),
  level: "debug",
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
    }),
  ],
});

export { logger };
