const express = require("express");
const { emailSignOnRouter } = require("./email-sign-on.applicants.auth.router");

const applicantsAuthRouter = express.Router();

applicantsAuthRouter.use("/email-sign-on", emailSignOnRouter);

module.exports = { applicantsAuthRouter };
