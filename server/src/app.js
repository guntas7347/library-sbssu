const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { router } = require("./router/router");

const app = express();

app.use(morgan("combined"));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

app.use("/api", router);

module.exports = { app };
