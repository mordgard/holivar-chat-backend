import { compare } from "bcrypt";
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
        return res
          .status(404)
          .json({ message: `User with email - ${email} not found` });
      }

      try {
        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
          return res
            .status(400)
            .json({ message: "Failed to login. Wrong password" });
        }

        const accessToken = jwt.sign({ id: user._id }, config.jwtSecret);
        res.status(200).json({ accessToken });
      } catch (error) {
        res.sendStatus(500);
        logger.error(error.message);
      }
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },
};

export { authService };
