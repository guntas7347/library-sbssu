import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const globalMiddlewares = (app) => {
  app.use(
    cors({
      origin: function (origin, callback) {
        const allowedOrigins = [
          "http://localhost:8080",
          "http://localhost:5173",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(express.json());

  app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    req.context = {};
    next();
  });
};

export default globalMiddlewares;
