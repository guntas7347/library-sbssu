const express = require("express");
const { adminRouter } = require("./admin/admin.router");
const { authSecured } = require("./auth/auth-secured.router");
const { verifyJwtMiddleware, verifyStaff } = require("./middlewares");
const { publicRouter } = require("./public-router");

const router = express.Router();

router.use("/public", publicRouter);

router.use(verifyJwtMiddleware);

router.use("/auth-secured", authSecured);

router.use("/admin", verifyStaff, adminRouter);

// TODO: Not using these two anymore for now
// router.use("/student/issue-history", issueHistoryRouter);

module.exports = { router };
