const express = require("express");
const {
  getMemberById,
  getMemberByRollNumber,
  createMember,
  getMembers,
  countMemberDocs,
  updateMemberById,
} = require("../../../models/member/member.controllers");
const {
  formatObjectValues,
  uuidGenerator,
} = require("../../../utils/functions");
const {
  findApplications,
} = require("../../../models/applications/applications.controllers");

const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const {
  fetchApplicationById,
  processDecision,
  allotLibraryCard,
  verifyRollNumberAvailability,
  fetchStudentByMembershipId,
} = require("./member.middlewares");
const {
  verifyEmailAvailabilityByEmail,
} = require("../../auth/applicants/applicants.middlewares.auth");
const {
  createAuthMember,
} = require("../../../models/auth/member/auth_member.controllers");
const { createPasswordHash } = require("../../../models/auth/functions");
const { authorisationLevel } = require("../../auth/auth.middlewares");

const memberRoute = express.Router();

memberRoute.post(
  "/create-new-student",
  authorisationLevel(4),
  verifyRollNumberAvailability,
  verifyEmailAvailabilityByEmail,
  async (req, res) => {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const memberDoc = await createMember(req.body, session);
        const { _id, email, fullName } = memberDoc[0];
        const authMemberDoc = {
          memberId: _id,
          email,
          userName: fullName,
          password: await createPasswordHash(uuidGenerator()),
        };
        const authDoc = await createAuthMember(authMemberDoc, session);
        await updateMemberById(memberDoc[0].id, { authId: authDoc[0].id });
      });
      await session.commitTransaction();
      return res.status(201).json(crs.STU201CNS());
    } catch (err) {
      console.log(err);
      if (session.inTransaction()) await session.abortTransaction();
      if (err.name === "ValidationError")
        return res.status(422).json(crs.MONGO422CNS());
      return res.status(500).json(crs.SERR500REST(err));
    } finally {
      await session.endSession();
    }
  }
); //create-new-student

memberRoute.post(
  "/fetch-student-by-roll-number",
  authorisationLevel(1),
  fetchStudentByMembershipId,
  async (req, res) => {
    try {
      return res.status(200).json(crs.STU200FSBRN(req.cust.memberDoc));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
); //fetch-student-by-roll-number

memberRoute.post(
  "/allot-library-card-to-student",
  authorisationLevel(4),
  fetchStudentByMembershipId,
  allotLibraryCard
);

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
  "/fetch-all-students",
  authorisationLevel(2),
  async (req, res) => {
    try {
      const members = await getMembers({
        filter: req.query.filter,
        filterValue: req.query.filterValue,
        page: req.query.page || 1,
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
  async (req, res) => {
    return res.status(200).json(crs.APP200APA());
  }
); //process-application

memberRoute.post(
  "/count-total-students",
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

module.exports = { memberRoute };
