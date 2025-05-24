const express = require("express");
const {
  getStaff,
  getStaffs,
  updateStaffById,
} = require("../../../models/staff/staff.controllers");
const { createStaff } = require("./staff.middlewares");
const crs = require("../../../utils/custom-response-codes");
const { authorisationLevel } = require("../../auth/auth.middlewares");
const {
  updateAuthAdmin,
} = require("../../../models/auth/aduth_admin.controllers");
const { default: mongoose } = require("mongoose");
const { joi_staff_create } = require("./staff.validator");
const Staff = require("../../../models/staff/staff.schema");
const { create2FA } = require("../../auth/admin/admin.auth.middlewares");
const Auth = require("../../../models/auth/auth.schema");
const { createLog } = require("../../../utils/functions");

const staffRouter = express.Router();

staffRouter.post(
  "/create",
  authorisationLevel(["admin"]),
  joi_staff_create,
  create2FA,
  createStaff,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200AADM());
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //create

staffRouter.post(
  "/search-all-staff",
  authorisationLevel(["search-staff"]),
  async (req, res) => {
    try {
      const staffCol = await getStaffs();
      const staffArray = [];
      for (const staff of staffCol) {
        if (staff.authId)
          staffArray.push({
            ...staff,
            rights: staff.authId.rights?.length || "N/A",
          });
        else staffArray.push(staff);
      }

      return res.status(200).json(crs.STF200FAS(staffArray));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //search-all-staff

staffRouter.post(
  "/fetch",
  authorisationLevel(["view-staff"]),
  async (req, res) => {
    try {
      const staffDoc = await Staff.findById(req.body._id)
        .populate({ path: "authId", select: "rights email active -_id" })
        .lean();
      return res.status(200).json(crs.STF200FSBI(staffDoc));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //fetch

staffRouter.post("/fetch-profile", authorisationLevel(), async (req, res) => {
  try {
    const d = await Staff.findOne({ authId: req.user.uid })
      .populate("authId", "email rights active -_id")
      .lean();
    const staffDoc = {
      ...d,
      ...d.authId,
      rights: d.authId.rights.map((item) => item.toUpperCase()).join(", "),
    };
    return res.status(200).json(crs.STF200FSBI(staffDoc));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
}); //fetch-profile

staffRouter.post("/edit", authorisationLevel(["admin"]), async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const { authId } = await Staff.findByIdAndUpdate(
        req.body.staffFields._id,
        req.body.staffFields
      );
      await Auth.findByIdAndUpdate(authId, req.body.authFields);
    });
    await session.commitTransaction();
    return res.status(200).json(crs.STF201ESDI());
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) await session.abortTransaction();
    if (error.code === 11000)
      return res.status(200).json(crs.MONGO11000ERR(error));
    return res.status(500).json(crs.SERR500REST(error));
  } finally {
    await session.endSession();
  }
});

staffRouter.post(
  "/change-status",
  authorisationLevel(["admin"]),
  async (req, res) => {
    try {
      const { authId } = await Staff.findById(req.body._id)
        .select("authId")
        .lean();
      if (req.body.status === "active")
        await Auth.findByIdAndUpdate(authId, { active: true });

      if (req.body.status === "inactive")
        await Auth.findByIdAndUpdate(authId, { active: false });

      return res.status(200).json(crs.STF201ESDI());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

module.exports = { staffRouter };
