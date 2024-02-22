const express = require("express");
const {
  findStudentAuth,
} = require("../../../models/auth/student/auth_student.controllers");
const { createJWT } = require("../jwt");
const { checkPassword } = require("../../../models/auth/functions");
const { verifyEmailForLogin } = require("./students.auth.middlewares");
const { verifyPassword, setJwtCookie } = require("../auth.middlewares");
const crs = require("../../../utils/custom-response-codes");

const studentRouter = express.Router();

studentRouter.post(
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

module.exports = { studentRouter };
