import { Router } from "express";
import * as userController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", userController.createUser);

authRouter.post("/login", userController.loginUser);

export default authRouter;
