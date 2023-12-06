const express = require("express");
const { emailSignOnRouter } = require("./email-sign-on/email-sign-on.router");
const { getAuthRoleById } = require("../../models/auth/auth.controllers");

const authRouter = express.Router();

authRouter.use("/email-sign-on", emailSignOnRouter);

module.exports = { authRouter };
