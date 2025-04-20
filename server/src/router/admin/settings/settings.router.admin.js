const express = require("express");
const { createLog } = require("../../../utils/functions");
const Setting = require("../../../models/setting/setting.schema");
const {
  createSettings,
} = require("../../../models/setting/setting.controller");
const crs = require("../../../utils/custom-response-codes");

const settingsRouter = express.Router();

// createSettings({
//   group: "",
//   key: "",
//   value: ""
// });

settingsRouter.post("/fetch", async (req, res) => {
  try {
    const doc = await Setting.findOne({ key: req.body.key });
    return res.status(200).json(crs.SET200GET(doc));
  } catch (error) {
    createLog(error);
  }
});

settingsRouter.post("/update", async (req, res) => {
  try {
    await Setting.findOneAndUpdate(
      { key: req.body.key },
      { value: req.body.value }
    );
    return res.status(200).json(crs.SET200UPD());
  } catch (error) {
    createLog(error);
  }
});

module.exports = { settingsRouter };
