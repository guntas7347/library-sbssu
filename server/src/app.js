const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rfs = require("rotating-file-stream");

const { router } = require("./router/router");
const { bulkBookEntry } = require("./utils/excel-bulk.entry");
// const { books1Sorted } = require("../books1-sorted");

const app = express();

const stream = rfs.createStream("morgan.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "30d", // rotate monthly
  compress: "gzip", // compress rotated files
});

app.use(cookieParser());

app.use(morgan("combined", { stream }));
app.use(morgan("combined"));

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://192.168.1.6:3000",
      ];

      // Check if the origin is allowed to access the server
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", router);

module.exports = { app };
