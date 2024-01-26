const express = require("express");
const {
  createNewStaff,
  fetchAllStaff,
  fetchStaffById,
} = require("../../../models/staff/staff.controllers");
const {
  createAdminAccount,
} = require("../../../models/auth/admin/aduth_admin.controllers");

const staffRouter = express.Router();

staffRouter.post("/create-new-staff", async (req, res) => {
  try {
    const newStaffDoc = await createNewStaff(req.body);
    await createAdminAccount({
      ...req.body,
      staffId: newStaffDoc.id,
      displayName: req.body.fullName,
    });
    return res.status(200).json({ status: "Success", payload: null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Fail", payload: null });
  }
});

staffRouter.post("/search-all-staff", async (req, res) => {
  try {
    const staffArray = await fetchAllStaff();
    return res.status(200).json({ status: "Success", payload: staffArray });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Fail", payload: null });
  }
});

staffRouter.post("/fetch-staff-by-id", async (req, res) => {
  try {
    const staffDoc = await fetchStaffById(req.body._id);
    return res.status(200).json({ status: "Success", payload: staffDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Fail", payload: null });
  }
});

module.exports = { staffRouter };
