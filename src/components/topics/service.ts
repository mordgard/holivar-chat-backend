import { Request, Response } from "express";
import { logger } from "../../utils";
import { Topic } from "./model";

// TODO move sending requests into router
const topicsService = {
  async getTopics(req: Request, res: Response) {
    try {
      const rawTopics = await Topic.find({});
      const topics = rawTopics.map(({ _id, title }) => ({ id: _id, title }));

      res.status(200).send(topics);
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },
  async addNewTopic(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const topic = new Topic({ title });
      await topic.save();
      res.status(200).send(topic);
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },
  async updateTopic(req: Request, res: Response) {
    try {
      const { topicId } = req.params;
      const { title } = req.body;
      const topic = await Topic.findByIdAndUpdate(topicId, { title });
      if (topic) {
        res.status(200).send(topic);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },
  async deleteTopic(req: Request, res: Response) {
    try {
      const { topicId } = req.params;
      const topic = await Topic.findByIdAndDelete(topicId);
      if (topic) {
        res.status(200).send(topic);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.sendStatus(500);
      logger.error(error.message);
    }
  },
};

export { topicsService };
