import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";
import { UserDto } from "../components/user";

const requireUserRole = (userRole: "moderator" | "admin") => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Require user role: %o", res.locals.authenticated);
    const { role } = res.locals.authenticated as UserDto;

    if (userRole === role) {
      next();
    } else {
      res.status(403).json({
        message: `Required "${userRole}" user role`,
      });
    }
  };
};

export { requireUserRole };
