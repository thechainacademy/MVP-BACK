import express from "express";
import "dotenv/config";
import "express-async-errors";
import connect from "./config/db.config.js";
import cors from "cors";
import authRouter from "./routes/user.routes.js";
import handleError from "./middlewares/errorHandlerMiddleware.js";

const app = express();
connect();

app.use(cors()).use(express.json()).use(authRouter).use(handleError);

export { app };
