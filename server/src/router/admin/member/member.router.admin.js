const express = require("express");
const {
  getMemberById,
  getMemberByRollNumber,
  createMember,
  getMembers,
  countMemberDocs,
  updateMemberById,
  quickSearchMember,
  findApplications,
} = require("../../../models/member/member.controllers");

const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const {
  fetchApplicationById,
  processDecision,
  allotLibraryCard,
  fetchStudentByMembershipId,
  sendApprovalEmail,
  checkIssues,
  checkPendingDues,
} = require("./member.middlewares");

const { authorisationLevel } = require("../../auth/auth.middlewares");
const Member = require("../../../models/member/member.schema");
const { validateMembershipId } = require("./member.validator");

const memberRoute = express.Router();

memberRoute.post(
  "/fetch-for-issue",
  authorisationLevel(1),
  validateMembershipId,
  async (req, res) => {
    try {
      const d = await Member.findOne({
        membershipId: req.body.membershipId,
        status: "ACTIVE",
      })
        .populate("libraryCards", "cardNumber status -_id")
        .select("membershipId fullName imageUrl -_id")
        .lean();

      if (!d) return res.status(404).json(crs.STU404FSBRN());

      return res.status(200).json(crs.STU200FSBRN(d));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //fetch-for-issue

memberRoute.post(
  "/fetch-all-applications",
  authorisationLevel(2),
  async (req, res) => {
    try {
      const ApplicantCol = await findApplications(req.body);
      return res.status(200).json(crs.STU200FAA(ApplicantCol));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

memberRoute.post(
  "/fetch-all-members",
  authorisationLevel(2),
  async (req, res) => {
    try {
      const members = await getMembers({
        filter: req.body.name,
        filterValue: req.body.value,
        page: req.body.page || 1,
      });
      return res.status(200).json(crs.STU200FAS(members));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

memberRoute.post(
  "/fetch-student-by-id",
  authorisationLevel(2),
  async (req, res) => {
    try {
      const studentDoc = await getMemberById(req.body._id, true);
      if (studentDoc) return res.status(200).json(crs.STU200FSBI(studentDoc));
      return res.status(404).json(crs.STU404FSBI());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

memberRoute.post(
  "/fetch-one-application",
  authorisationLevel(2),
  fetchApplicationById,
  async (req, res) => {
    try {
      return res.status(200).json(crs.APP200FA(req.cust.applicantionDoc));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST());
    }
  }
); //fetch-one-application

memberRoute.post(
  "/process-application",
  authorisationLevel(3),
  fetchApplicationById,
  processDecision,
  sendApprovalEmail,
  async (req, res) => {
    return res.status(200).json(crs.APP200APA());
  }
); //process-application

memberRoute.post(
  "/count-total-members",
  authorisationLevel(1),
  async (req, res) => {
    try {
      const numberOfStudentDocs = await countMemberDocs(req.body.filter);
      return res.status(200).json(crs.STU200CTS(numberOfStudentDocs));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

memberRoute.post(
  "/edit-existing-student",
  authorisationLevel(4),
  async (req, res) => {
    try {
      const studentDoc = await getMemberByRollNumber(req.body.rollNumber);
      if (studentDoc) {
        const { rollNumber } = await getMemberById(req.body._id);
        if (studentDoc._doc.rollNumber !== rollNumber)
          return res.status(409).json(crs.CONFL409CNS());
      }

      await updateMemberById(req.body._id, req.body);
      return res.status(200).json(crs.STU200ES());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

memberRoute.post("/quick-search", async (req, res) => {
  try {
    //
    const result = await quickSearchMember(req.body);
    if (result.length === 0) return res.status(404).json(crs.SRH404GLB());
    return res.status(200).json(crs.SRH200GLB(result));
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

memberRoute.post(
  "/mark-inactive",
  checkIssues,
  checkPendingDues,
  async (req, res) => {
    try {
      await updateMemberById(req.body._id, { status: "INACTIVE" });
      return res.status(200).json(crs.MEB200MI());
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

module.exports = { memberRoute };
