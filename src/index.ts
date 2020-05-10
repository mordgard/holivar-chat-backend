import { config } from "./config";
import { server } from "./server";
import { logger } from "./utils/logger";

server.listen(config.port, () => {
  logger.info(`Server started at localhost:${config.port}`);
});
