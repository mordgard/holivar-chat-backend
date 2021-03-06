import { hash } from "bcrypt";
import { Request, Response } from "express";
import pick from "lodash/pick";
import { logger } from "../../utils";
import { User } from "./model";
import { IUserDto } from "./userDto";

const userService = {
  async getUsers(req: Request, res: Response) {
    try {
      const userProjection = {
        id: true,
        status: true,
        role: true,
        email: true,
        topicsAnswers: true,
      };

      const users = await User.find({}, userProjection);

      res.status(200).send(users);
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
  },

  async topicAnswer(req: Request, res: Response) {
    logger.debug("topics answer service %o", res.locals.authenticated);
    const { id: userId } = res.locals.authenticated as IUserDto;
    const { topicId, answer } = req.body;

    // TODO update answer if topicId exists or add new one
    try {
      const { topicsAnswers } = await User.findByIdAndUpdate(
        userId,
        { $push: { topicsAnswers: { topicId, answer } } },
        {
          new: true,
        },
      );

      res.status(200).send(topicsAnswers);
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },
};

export { userService };
