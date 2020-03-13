import { Router } from "express";
import { userService } from "./service";
import { validateUsers } from "./validator";

const router = Router();

router.get("/", validateUsers.get, userService.getUsers);

router.post("/", validateUsers.add);

export { router };
