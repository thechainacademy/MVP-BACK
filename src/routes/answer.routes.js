import { Router } from "express";

import isAuhtenticatedMiddleware from "../middlewares/isAuthenticatedMiddleware.js";
import * as answerController from "../controllers/answer.controller.js";

const answerRouter = Router();

answerRouter.post(
  "/answer",
  isAuhtenticatedMiddleware,
  answerController.createAnswer
);

export default answerRouter;
