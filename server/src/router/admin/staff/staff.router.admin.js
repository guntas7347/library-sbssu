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

const staffRouter = express.Router();

staffRouter.post(
  "/create",
  authorisationLevel(6),
  joi_staff_create,
  createStaff,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200AADM());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

staffRouter.post(
  "/search-all-staff",
  authorisationLevel(2),
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
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

staffRouter.post(
  "/fetch-staff-by-id",
  authorisationLevel(2),
  async (req, res) => {
    try {
      const staffDoc = await getStaff({ _id: req.body._id });
      return res.status(200).json(
        crs.STF200FSBI({
          ...staffDoc[0]._doc,
          level: staffDoc[0].authId.level,
          active: staffDoc[0].authId.active,
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

staffRouter.post("/fetch-profile", authorisationLevel(1), async (req, res) => {
  try {
    const staffDoc = await getStaff({ authId: req.user.uid });
    return res.status(200).json(
      crs.STF200FSBI({
        ...staffDoc[0]._doc,
        level: staffDoc[0].authId.level,
        active: staffDoc[0].authId.active,
      })
    );
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

staffRouter.post("/edit-staff", authorisationLevel(6), async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const staffUpdateData = {
      email: req.body.update.email,
      idNumber: req.body.update.idNumber,
      fullName: req.body.update.fullName,
      userName: req.body.update.fullName,
      level: req.body.update.level,
    };
    console.log({ _id: req.body.update.authId });
    await session.withTransaction(async () => {
      await updateStaffById(req.body._id, staffUpdateData, session);
      await updateAuthAdmin(
        { _id: req.body.update.authId },
        staffUpdateData,
        session
      );
    });
    await session.commitTransaction();
    return res.status(200).json(crs.STF201ESDI());
  } catch (err) {
    createLog(err);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(err));
  } finally {
    await session.endSession();
  }
});

module.exports = { staffRouter };
