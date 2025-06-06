import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json({ limit: "16kb" })); // Limit the size of JSON payloads to 10kb
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Limit the size of URL-encoded payloads to 10kb
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.routes.js";

// Routes declaration
app.use("/api/v1/user", userRouter);

export { app };
