import { Router } from "express";
import * as userController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", userController.createUser);

authRouter.post("/sign-in", userController.loginUser);

authRouter.put("/ask-for-reset", userController.askForReset);

authRouter.put("/reset-pass", userController.resetPass);

export default authRouter;
