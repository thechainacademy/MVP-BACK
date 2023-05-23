import { Router } from "express";
import * as userController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", userController.createUser);

authRouter.post("/sign-in", userController.loginUser);

export default authRouter;
