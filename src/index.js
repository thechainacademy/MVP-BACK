import express from "express";
import "dotenv/config";
import connect from "./config/db.config.js";
import cors from "cors";
import authRouter from "./routes/user.routes.js";

const app = express();
connect();

app.use(cors()).use(express.json()).use(authRouter);

export { app };
