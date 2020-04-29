import { Router } from "express";
import { requireAuth, requireUserStatus } from "../../middlewares";
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
  requireAuth,
  requireUserStatus("active"),
  validateTopics.addNewTopic,
  topicsService.addNewTopic
);

router.put(
  "/:topicId",
  requireAuth,
  requireUserStatus("active"),
  validateTopics.updateTopic,
  topicsService.updateTopic
);

router.delete(
  "/:topicId",
  requireAuth,
  requireUserStatus("active"),
  validateTopics.deleteTopic,
  topicsService.deleteTopic
);

export { router };
