import { Router } from "express";
import { requireAuth, requireUserRole } from "../../middlewares";
import { userService } from "./service";
import { validateUsers } from "./validator";

const router = Router();

router.get("/", requireAuth, requireUserRole("admin"), userService.getUsers);
router.post("/", validateUsers.addUser, userService.addUser);
router.put(
  "/activate/:userId",
  requireAuth,
  requireUserRole("admin"),
  validateUsers.activateUser,
  userService.activateUser);

export { router };
