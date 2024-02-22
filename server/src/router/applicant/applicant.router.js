const express = require("express");
const {
  createApplication,
  getApplicationById,
  deleteApplication,
} = require("../../models/applications/applications.controllers");
const crs = require("../../utils/custom-response-codes");
const {
  getStudentByRollNumber,
} = require("../../models/students/students.controllers");

const applicantRouter = express.Router();

applicantRouter.post("/create-new-application", async (req, res) => {
  try {
    const student = await getStudentByRollNumber(req.body.rollNumber);
    if (student != null) return res.status(409).json(crs.APP409CNA());
    await createApplication({ ...req.body, _id: req.user.uid });
    return res.status(200).json(crs.APP200CNA());
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

applicantRouter.post("/get-application", async (req, res) => {
  try {
    const applicationDoc = await getApplicationById(req.user.uid);
    if (applicationDoc === null) return res.status(404).json(crs.APP404FA());
    return res.status(200).json(crs.APP200FA(applicationDoc));
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

applicantRouter.post("/delete-application", async (req, res) => {
  try {
    const a = await deleteApplication(req.user.uid);
    return res.status(200).json(crs.APP200DA());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { applicantRouter };
