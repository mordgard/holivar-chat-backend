import { Request, Response } from "express";
import { logger } from "../../utils";
import { User } from "./model";

const userService = {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error.message);
    }
  },
  async addUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = new User({ email, password });
      await user.save();
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
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
      const user = await User.findByIdAndUpdate(userId, { status: "active" });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error.message);
    }
  }
};

export { userService };
