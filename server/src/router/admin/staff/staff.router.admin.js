const express = require("express");
const {
  findStaff,
  getStaffById,
} = require("../../../models/staff/staff.controllers");
const {
  verifyEmailAvailability,
  createStaffAndAuthAdmin,
} = require("./staff.middlewares");
const crs = require("../../../utils/custom-response-codes");

const staffRouter = express.Router();

staffRouter.post(
  "/create-new-staff",
  verifyEmailAvailability,
  createStaffAndAuthAdmin,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200AADM());
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

staffRouter.post("/search-all-staff", async (req, res) => {
  try {
    const staffCol = await findStaff();
    return res.status(200).json(crs.STF200FAS(staffCol));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

staffRouter.post("/fetch-staff-by-id", async (req, res) => {
  try {
    const staffDoc = await getStaffById(req.body._id);
    return res.status(200).json(crs.STF200FSBI(staffDoc));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { staffRouter };
