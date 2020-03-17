import { Router } from "express";
import { topicsService } from "./service";
import { validateTopics } from "./validator";

const router = Router();

router.get(
  "/",
  validateTopics.getTopics,
  topicsService.getTopics
);

router.post(
  "/",
  validateTopics.addNewTopic,
  topicsService.addNewTopic
); // TODO: active moderators only

router.put(
  "/:topicId",
  validateTopics.updateTopic,
  topicsService.updateTopic
); // TODO: active moderators only

router.delete(
  "/:topicId",
  validateTopics.deleteTopic,
  topicsService.deleteTopic
); // TODO: active moderators only

export { router };
