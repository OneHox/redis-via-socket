import "express-async-errors";
import express from "express";
import { json } from "body-parser";
import { ENV } from "./env";

import cookieSession from "cookie-session";
import cors from "cors";

const app = express();
app.use(json());
app.set("trust proxy", true);
app.use(cors({ origin: "*", exposedHeaders: ["base64"] }));
app.use(
  cookieSession({
    secure: ENV() !== "test",
    signed: false,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "appname" });
});

app.all("*", (req, res) => {
  res.json({ message: "appname" });
  if (process.env.NODE_ENV === "production") {
    // ...
  }
});

export { app };
