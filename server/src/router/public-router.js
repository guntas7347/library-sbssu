const express = require("express");
const { authRouter } = require("./auth/auth.router");
const { uploadRouter } = require("./uploader/uploader");
const { publicSettings } = require("./public/settings/public-settings.router");
const { public_memberRouter } = require("./public/member/member-public.router");

const publicRouter = express.Router();

publicRouter.use("/auth", authRouter);
publicRouter.use("/upload", uploadRouter);
publicRouter.use("/settings", publicSettings);
publicRouter.use("/member", public_memberRouter);

module.exports = { publicRouter };
