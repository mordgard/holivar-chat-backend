import { hash } from "bcrypt";
import { Request, Response } from "express";
import uniqBy from "lodash/uniqBy";
import { Topic } from "../../types";
import { logger } from "../../utils";
import { Topic as TopicModel } from "../topics/model";
import { User } from "./model";
import { UserDto } from "./userDto";

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
      logger.debug("getUsers: %o", users);

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
      logger.debug("addUser: %o", req.body);

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
      const user = await User.findOne({ email });
      logger.debug("findUserByEmail %o", user);
      return user;
    } catch (error) {
      logger.error(error.message);
      return error;
    }
  },

  async findUserById(id: string) {
    try {
      const user = await User.findById(id);
      logger.debug("findUserById %o", user);
      return user;
    } catch (error) {
      logger.error(error.message);
      return error;
    }
  },

  async activateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      await User.findByIdAndUpdate(userId, { status: "active" });
      logger.debug("activateUser %o", userId);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },

  async getAnswers(req: Request, res: Response) {
    const { topicsAnswers } = res.locals.authenticated as UserDto;
    const answers = topicsAnswers.map(({ topicId, answer }) => ({ topicId, answer }));
    logger.debug("getAnswers: %o", answers);

    res.status(200).send(answers);
  },

  async topicAnswer(req: Request, res: Response) {
    const { id: userId, topicsAnswers: oldAnswers } = res.locals.authenticated as UserDto;
    const { topicId, answer } = req.body;
    logger.debug("topicAnswer %o", res.locals.authenticated);

    try {
      const rawTopics = await TopicModel.find({});

      const topicIdsToRemove = uniqBy(oldAnswers, answer => rawTopics.some(topic => topic._id !== answer.topicId));
      logger.debug("topicIdsToRemove %o", topicIdsToRemove);

      const { topicsAnswers } = await User.findByIdAndUpdate(
        userId,
        {
          $push: { topicsAnswers: { topicId, answer } },
          // $pull: { topicsAnswers: { topicId: { $in: topicIdsToRemove } } },
        },
        {
          new: true,
        },
      );

      const answers = topicsAnswers.map(({ topicId, answer }: Topic) => ({ topicId, answer }));
      res.status(200).send(answers);
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },
};

export { userService };
