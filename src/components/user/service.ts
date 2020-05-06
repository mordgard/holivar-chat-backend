import { hash } from "bcrypt";
import { Request, Response } from "express";
import pick from "lodash/pick";
import { logger } from "../../utils";
import { User } from "./model";

const userService = {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find({}); // TODO use mongoose schemas for filter??

      const clearedUsers = users.map(user => pick(user, ["id", "status", "role", "email"]));

      res.status(200).send(clearedUsers);
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },
  async addUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const hashPassword = await hash(password, 10);

      const user = new User({ email, password: hashPassword });
      await user.save();

      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },
  async findUserByEmail(email: string) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      logger.error(error.message);
      return error;
    }
  },
  async findUserById(id: string) {
    try {
      return await User.findById(id);
    } catch (error) {
      logger.error(error.message);
      return error;
    }
  },
  async activateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      await User.findByIdAndUpdate(userId, { status: "active" });
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  }
};

export { userService };
