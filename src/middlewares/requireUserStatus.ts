import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";

const requireUserStatus = (userStatus: "new" | "active" | "archived") => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Require user status: %o", req.body);

    if (userStatus === req.body.user.status) {
      next();
    } else {
      res.status(403).json({
        message: `Required "${userStatus}" user status`,
      });
    }
  };
};

export { requireUserStatus };
