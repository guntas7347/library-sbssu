const express = require("express");
const crs = require("../../../utils/custom-response-codes");
const { createLog } = require("../../../utils/functions");
const Setting = require("../../../models/setting/setting.schema");

const publicSettings = express.Router();

publicSettings.post("/fetch/programs", async (req, res) => {
  try {
    const { value } = await Setting.findOne({ key: "PRO-SPZ-LIST" })
      .select("value -_id")
      .lean();
    return res.status(200).json(crs.SET200GET(value));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

module.exports = { publicSettings };
