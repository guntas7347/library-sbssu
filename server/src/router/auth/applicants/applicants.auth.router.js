const express = require("express");
const crs = require("../../../utils/custom-response-codes");
const {
  verifyEmailAvailabilityByEmail,
  createApplicant,
  sendVerificationEmail,
  verifyEmailForLogin,
  fetchAuthApplicantByEmail,
  createLink,
  processLink,
  verifyResetLink,
} = require("./applicants.middlewares.auth");
const { verifyPassword, setJwtCookie } = require("../auth.middlewares");
const { createPasswordHash } = require("../../../models/auth/functions");
const {
  updateAuthApplicant,
} = require("../../../models/auth/applicant/auth_applicant.controllers");
const { uuidGenerator } = require("../../../utils/functions");

const applicantsAuthRouter = express.Router();

applicantsAuthRouter.post(
  "/login",
  verifyEmailForLogin,
  verifyPassword,
  setJwtCookie,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200LAPP());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

applicantsAuthRouter.post(
  "/create-user",
  verifyEmailAvailabilityByEmail,
  createLink,
  createApplicant,
  processLink,
  sendVerificationEmail,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200SAPP());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

applicantsAuthRouter.post(
  "/dispatch-reset-link",
  fetchAuthApplicantByEmail,
  createLink,
  processLink,
  sendVerificationEmail,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200LDPS());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

applicantsAuthRouter.post(
  "/verify-reset-link",
  verifyResetLink,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200LVFS());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

applicantsAuthRouter.post("/reset-password", async (req, res) => {
  try {
    const password = await createPasswordHash(req.body.password);
    await updateAuthApplicant(
      { resetCode: req.body.code },
      { password, resetCode: uuidGenerator(3) }
    );
    return res.status(200).json(crs.AUTH200RAP());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
}); //reset-password

module.exports = { applicantsAuthRouter };
