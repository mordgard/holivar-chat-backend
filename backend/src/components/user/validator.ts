import { NextFunction, Request, Response } from "express";
import { addUser } from "./schemas";

const validateUsers = {
  async get(req: Request, res: Response, next: NextFunction) {
    next();
  },
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      await addUser.validate({ email, password }, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};

export { validateUsers };
