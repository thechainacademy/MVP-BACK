import express from "express";
import "dotenv/config";
import "express-async-errors";
import connect from "./config/db.config.js";
import cors from "cors";
import authRouter from "./routes/user.routes.js";
import handleError from "./middlewares/errorHandlerMiddleware.js";
import bountieRouter from "./routes/bountie.routes.js";

const app = express();
connect();

app
  .use(cors())
  .use(express.json())
  .use(authRouter)
  .use(bountieRouter)
  .use(handleError);

export { app };
