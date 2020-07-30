import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";

const requireUserRole = (role: "moderator" | "admin") => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Require user role: %o", req.body);

    if (role === req.body.user.role) {
      next();
    } else {
      res.status(403).json({
        message: `Required "${role}" user role`,
      });
    }
  };
};

export { requireUserRole };
