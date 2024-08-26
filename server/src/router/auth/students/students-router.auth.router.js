const express = require("express");
const {
  findStudentAuth,
  updateAuthStudent,
} = require("../../../models/auth/student/auth_student.controllers");
const { createJWT } = require("../jwt");
const {
  checkPassword,
  createPasswordHash,
} = require("../../../models/auth/functions");
const {
  verifyEmailForLogin,
  verifyEmailAvailabilityByEmail,
  createUserAndOTP,
  sendVerificationEmail,
  createLink,
  processLink,
  verifyResetLink,
} = require("./students.auth.middlewares");
const { verifyPassword, setJwtCookie } = require("../auth.middlewares");
const crs = require("../../../utils/custom-response-codes");
const { uuidGenerator } = require("../../../utils/functions");

const studentAuthRouter = express.Router();

studentAuthRouter.post(
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

studentAuthRouter.post(
  "/dispatch-reset-link",
  verifyEmailForLogin,
  createLink,
  processLink,
  async (req, res) => {
    try {
      console.log(req.cust.link);
      return res.status(200).json(crs.AUTH200LDPS());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

studentAuthRouter.post(
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

studentAuthRouter.post("/reset-password", async (req, res) => {
  try {
    const password = await createPasswordHash(req.body.password);
    await updateAuthStudent(
      { resetCode: req.body.code },
      { password, resetCode: uuidGenerator(3) }
    );
    return res.status(200).json(crs.AUTH200RAP());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

// studentAuthRouter.post(
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

module.exports = { studentAuthRouter };
