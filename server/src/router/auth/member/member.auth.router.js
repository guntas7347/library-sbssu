const express = require("express");

const { createPasswordHash } = require("../../../models/auth/functions");
const {
  verifyEmailForLogin,
  sendVerificationEmail,
  createLink,
  processLink,
  verifyResetLink,
} = require("./member.auth.middlewares");
const { verifyPassword, setJwtCookie } = require("../auth.middlewares");
const crs = require("../../../utils/custom-response-codes");
const { uuidGenerator } = require("../../../utils/functions");
const {
  updateAuthMember,
} = require("../../../models/auth/member/auth_member.controllers");

const memberAuthRouter = express.Router();

memberAuthRouter.post(
  "/login",
  verifyEmailForLogin,
  verifyPassword,
  setJwtCookie,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200STU());
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST());
    }
  }
);

memberAuthRouter.post(
  "/dispatch-reset-link",
  verifyEmailForLogin,
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

memberAuthRouter.post(
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

memberAuthRouter.post("/reset-password", async (req, res) => {
  try {
    const password = await createPasswordHash(req.body.password);
    await updateAuthMember(
      { resetCode: req.body.code },
      { password, resetCode: uuidGenerator(3) }
    );
    return res.status(200).json(crs.AUTH200RAP());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

// memberAuthRouter.post(
//   "/create-user/send-otp",
//   verifyEmailAvailabilityByEmail,
//   createUserAndOTP,
//   sendVerificationEmail,
//   async (req, res) => {
//     try {
//       const studentDoc = req.cust.studentDoc;
//       return res.status(200).json(crs.AUTH200SAPP(studentDoc._doc._id));
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(crs.SERR500REST(err));
//     }
//   }
// );

module.exports = { memberAuthRouter };
