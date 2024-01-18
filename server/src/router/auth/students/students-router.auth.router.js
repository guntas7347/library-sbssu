const express = require("express");
const { emailSignOn } = require("./email-sign-on.student.auth");

const studentRouter = express.Router();

studentRouter.use("/email-sign-on", emailSignOn);

module.exports = { studentRouter };
