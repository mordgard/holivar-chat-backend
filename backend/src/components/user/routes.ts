import { Router } from "express";
import { requireAuth } from "../../middlewares";
import { userService } from "./service";
import { validateUsers } from "./validator";

const router = Router();

router.get("/", requireAuth, userService.getUsers); // TODO admin auth
router.post("/", validateUsers.addUser, userService.addUser);
router.put("/activate/:userId", requireAuth, validateUsers.activateUser, userService.activateUser); // TODO admin auth

export { router };
