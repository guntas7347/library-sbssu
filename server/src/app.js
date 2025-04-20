const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//security imports
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { router } = require("./router/router");

const app = express();

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  handler: function (req, res) {
    return res.status(429).json({
      status: "RATELIMIT",
      message:
        "Too many requests from this IP, please try again after 15 minutes",
      payload: null,
    });
  },
  headers: true,
});

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: function (origin, callback) {
        const allowedOrigins = ["http://localhost:3000"];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );
}

app.use(limiter);
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.use(
  "/api",
  (req, res, next) => {
    console.log("Incoming req at: " + req.url);
    next();
  },
  router
);

module.exports = { app };
