const express = require("express");
const {
  createApplication,
  getApplicationById,
  deleteApplicationById,
} = require("../../models/applications/applications.controllers");
const crs = require("../../utils/custom-response-codes");
const { getMember } = require("../../models/member/member.controllers");
const {
  getAuthApplicantById,
} = require("../../models/auth/applicant/auth_applicant.controllers");

const applicantRouter = express.Router();

applicantRouter.post("/create-new-application", async (req, res) => {
  try {
    if (req.body.rollNumber) {
      const member = await getMember({ rollNumber: req.body.rollNumber });
      if (member) return res.status(409).json(crs.APP409CNA());
    }
    const { email } = await getAuthApplicantById(req.user.uid);
    await createApplication({ ...req.body, email, _id: req.user.uid });
    return res.status(200).json(crs.APP200CNA());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

applicantRouter.post("/get-application", async (req, res) => {
  try {
    const applicationDoc = await getApplicationById(req.user.uid);
    if (applicationDoc === null) return res.status(404).json(crs.APP404FA());
    return res.status(200).json(crs.APP200FA(applicationDoc));
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

applicantRouter.post("/delete-application", async (req, res) => {
  try {
    await deleteApplicationById(req.user.uid);
    return res.status(200).json(crs.APP200DA());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { applicantRouter };
