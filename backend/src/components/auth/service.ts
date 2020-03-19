import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { logger } from "../../utils";
import { userService } from "../user";

const authService = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.findUserByEmail(email);

      if (!user) {
        res.status(404).json({ message: `User with email - ${email} not found` });
      }

      const accessToken = jwt.sign({ id: user._id }, config.jwtSecret);
      res.status(200).json({ ...user.toObject(), accessToken });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error.message);
    }
  }
};

export { authService };
