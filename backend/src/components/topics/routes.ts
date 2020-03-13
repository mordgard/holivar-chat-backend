import { Router } from "express";
import { topicsService } from "./service";
import { validateTopics } from "./validator";

const router = Router();

router.get(
  "/",
  validateTopics.get,
  topicsService.getTopics
);

router.post(
  "/",
  validateTopics.add,
  topicsService.addNewTopic
);

router.put(
  "/:topicId",
  validateTopics.update,
  topicsService.updateTopic
);

router.delete(
  "/:topicId",
  validateTopics.delete,
  topicsService.deleteTopic
);

export { router };
