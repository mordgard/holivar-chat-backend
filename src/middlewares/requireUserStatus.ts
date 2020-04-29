import { NextFunction, Request, Response } from "express";

const requireUserStatus = (userStatus: "new" | "active" | "archived") => {
  return (req: Request, res: Response, next: NextFunction) => {

    if (userStatus === req.body.user.status) {
      next();
    } else {
      res.status(403).json({
        message: `Required "${userStatus}" user status`
      });
    }

  };
};

export { requireUserStatus };
