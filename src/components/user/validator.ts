import { NextFunction, Request, Response } from "express";
import { activateUserSchema, addUserSchema } from "./schemas";

const validateUsers = {
  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      await addUserSchema.validate({ email, password }, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      await activateUserSchema.validate({ userId }, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};

export { validateUsers };
