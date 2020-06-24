import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils";
import { loginSchema } from "./schemas";

const validateCredentials = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      await loginSchema.validate({ email, password }, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export { validateCredentials };
