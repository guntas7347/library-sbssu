const express = require("express");

const { settingsRouter } = require("./admin/settings/settings.router.admin");

const { authRouter } = require("./auth/auth.router");
const { adminRouter } = require("./admin/admin.router");

const { authSecured } = require("./auth/auth-secured.router");
const { verifyJwtMiddleware, verifyStaff } = require("./middlewares");

const router = express.Router();

router.use("/auth", authRouter);
// router.use("/admin/settings", settingsRouter);

router.use(verifyJwtMiddleware);

router.use("/auth-secured", authSecured);

router.use("/admin", verifyStaff, adminRouter);

// TODO: Not using these two anymore for now
// router.use("/student/issue-history", issueHistoryRouter);
// router.use("/upload", uploadRouter);

module.exports = { router };
