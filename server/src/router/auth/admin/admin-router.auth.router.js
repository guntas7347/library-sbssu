const express = require("express");
const adminRouter = express.Router();

const { emailSignOn } = require("./email-sign-on.admin.auth.router");

adminRouter.use("/email-sign-on", emailSignOn);

module.exports = { adminRouter };
