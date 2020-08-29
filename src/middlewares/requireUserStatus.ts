import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";
import { IUserDto } from "../components/user";

const requireUserStatus = (userStatus: "new" | "active" | "archived") => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Require user status: %o", res.locals.authenticated);
    const { status } = res.locals.authenticated as IUserDto;

    if (userStatus === status) {
      next();
    } else {
      res.status(403).json({
        message: `Required "${userStatus}" user status`,
      });
    }
  };
};

export { requireUserStatus };
