import { NextFunction, Request, Response } from "express";
import { activateUserSchema, addUserSchema, topicAnswerSchema } from "./schemas";
import { logger } from "../../utils";

const validateUsers = {
  async addUser(req: Request, res: Response, next: NextFunction) {
    logger.debug("Add user %o", req.body);
    try {
      const { email, password } = req.body;
      await addUserSchema.validate({ email, password }, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  async activateUser(req: Request, res: Response, next: NextFunction) {
    logger.debug("Activate user %o", req.params);
    try {
      const { userId } = req.params;
      await activateUserSchema.validate({ userId }, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  async topicAnswer(req: Request, res: Response, next: NextFunction) {
    logger.debug("Topic answer %o", req.body);
    try {
      const { topicId, answer } = req.body;
      await topicAnswerSchema.validate({ topicId, answer }, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export { validateUsers };
