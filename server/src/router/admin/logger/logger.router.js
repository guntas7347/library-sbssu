const express = require("express");
const crs = require("../../../utils/custom-response-codes");
const { createLog } = require("../../../utils/functions");
const { getLoginLogs } = require("./logger.middlewares");
const Log = require("../../../models/logs/log.schema");

const logRouter = express.Router();

logRouter.post("/logins", async (req, res) => {
  try {
    const logs = await Log.find().sort({ _id: -1 }).limit(50).lean();
    return res.status(200).json(crs.LOG200LOGIN(logs));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

module.exports = { logRouter };
