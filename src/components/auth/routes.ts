import { Router } from "express";
import { authService } from "./service";
import { validateCredentials } from "./validator";

const router = Router();

router.post("/login", validateCredentials.login, authService.login);

export { router };
