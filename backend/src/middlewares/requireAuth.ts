import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userService } from "../components/user";
import { config } from "../config";
import { logger } from "../utils";

interface IPayload {
  id: string;
  iat: number;
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.header("Authorization") || "").split(" ")[1];

  if (!accessToken) {
    logger.error("Token isn't provided");
    res.status(403).json({ message: "Token isn't provided" });
  }

  jwt.verify(accessToken, config.jwtSecret, async (verificationError, payload: IPayload) => {
    if (verificationError) {
      logger.error(verificationError.message);
      res.status(403).json({ message: "Token verification failed" });
    }

    if (typeof payload !== "object" || typeof payload.id !== "string") {
      logger.error("Wrong token payload");
      res.status(403).json({ message: "Token verification failed" });
    }

    const { id } = payload;

    try {
      const user = await userService.findUserById(id);

      if (!user) {
        logger.error("User not found");
        res.status(403).json({ message: "User not found" });
      }

      req.body.user = user;
      next();
    } catch (dbError) {
      logger.error(dbError.message);
      res.status(500).json({ error: dbError, message: "Authorization failed. Internal server error" });
    }
  });
};

export { requireAuth };
