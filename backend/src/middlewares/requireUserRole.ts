import { NextFunction, Request, Response } from "express";

const requireUserRole = (role: "moderator" | "admin") => {
  return (req: Request, res: Response, next: NextFunction) => {

    if (role === req.body.user.role) {
      next();
    } else {
      res.status(403).json({
        message: `Required "${role}" user role`
      });
    }

  };
};

export { requireUserRole };
