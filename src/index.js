import express from "express";
import "dotenv/config";
import connect from "./config/db.config.js";
import cors from "cors";
import authRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());

connect();
app.use("/user", authRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});
