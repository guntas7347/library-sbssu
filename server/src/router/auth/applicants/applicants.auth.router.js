const express = require("express");
const crs = require("../../../utils/custom-response-codes");
const {
  verifyEmailAvailabilityByEmail,
  fetchOTPFromDatabase,
  verifyOTP,
  markUserAsVerified,
  createUserAndOTP,
  sendVerificationEmail,
  verifyEmailForLogin,
} = require("./applicants.middlewares.auth");
const { verifyPassword, setJwtCookie } = require("../auth.middlewares");

const applicantsAuthRouter = express.Router();

applicantsAuthRouter.post(
  "/create-user/send-otp",
  verifyEmailAvailabilityByEmail,
  createUserAndOTP,
  sendVerificationEmail,
  async (req, res) => {
    try {
      const applicantDoc = req.cust.applicantDoc;
      return res.status(200).json(crs.AUTH200SAPP(applicantDoc._doc._id));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

applicantsAuthRouter.post(
  "/create-user/verify-otp",
  fetchOTPFromDatabase,
  verifyOTP,
  markUserAsVerified,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200VAPP());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

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

module.exports = { applicantsAuthRouter };
