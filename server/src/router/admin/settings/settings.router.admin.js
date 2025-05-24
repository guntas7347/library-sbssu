const express = require("express");
const { createLog } = require("../../../utils/functions");
const Setting = require("../../../models/setting/setting.schema");
const {
  createSettings,
} = require("../../../models/setting/setting.controller");
const crs = require("../../../utils/custom-response-codes");
const { authorisationLevel } = require("../../auth/auth.middlewares");

const settingsRouter = express.Router();

// Setting.create({
//   group: "issue",
//   key: "ISSUE-COMPATIBILITY",
//   value: {
//     GENERAL: ["GENERAL"],
//     "BOOK-BANK": ["BOOK-BANK"],
//     MASTER: ["GENERAL", "BOOK-BANK"],
//   },
// });

settingsRouter.post("/fetch", authorisationLevel(), async (req, res) => {
  try {
    const doc = await Setting.findOne({ key: req.body.key });
    return res.status(200).json(crs.SET200GET(doc));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

settingsRouter.post(
  "/update",
  authorisationLevel(["admin"]),
  async (req, res) => {
    try {
      await Setting.findOneAndUpdate(
        { key: req.body.key },
        { value: req.body.value }
      );
      return res.status(200).json(crs.SET200UPD());
    } catch (error) {
      createLog(error);
    }
  }
);

module.exports = { settingsRouter };
