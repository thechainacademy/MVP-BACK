import { Router } from "express";
import * as bountieController from "../controllers/bountie.controller.js";
import isAuhtenticatedMiddleware from "../middlewares/isAuthenticatedMiddleware.js";

const bountieRouter = Router();

bountieRouter.post(
  "/bountie",
  isAuhtenticatedMiddleware,
  bountieController.createBountie
);

bountieRouter.get(
  "/bountie",
  isAuhtenticatedMiddleware,
  bountieController.getBounties
);

bountieRouter.get(
  "/my-bounties",
  isAuhtenticatedMiddleware,
  bountieController.getMyBounties
);

bountieRouter.get(
  "/bountie/:id",
  isAuhtenticatedMiddleware,
  bountieController.getBountie
);

export default bountieRouter;
