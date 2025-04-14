const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const { router } = require("./router/router");

const app = express();

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
