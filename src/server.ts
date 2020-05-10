import http from "http";
import socketIO from "socket.io";
import { app } from "./app";
import { logger } from "./utils";

const server: http.Server = http.createServer(app);
const io: socketIO.Server = socketIO(server);

io.on("connection", socket => {
  logger.info(`New connection: ${socket.id}`);
});

export { server };
