const express = require("express");

const { settingsRouter } = require("./admin/settings/settings.router.admin");
const {
  issueHistoryRouter,
} = require("./student/issue-history/issue-history.router.student");
const { authRouter } = require("./auth/auth.router");
const { applicantRouter } = require("./applicant/applicant.router");
const { verifyJwt, decrptText } = require("./auth/jwt");
const { adminRouter } = require("./admin/admin.router");
const crs = require("../utils/custom-response-codes");

const {
  getAuthAdminById,
} = require("../models/auth/admin/aduth_admin.controllers");

const { authSecured } = require("./auth/auth-secured.router");
const { uploadRouter } = require("./uploader");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin/settings", settingsRouter);

const verifyJwtMiddleware = (req, res, next) => {
  try {
    const jwt = verifyJwt(decrptText(req.cookies.session));

    if (jwt === null) {
      res.cookie("session", null, { expires: new Date(0) });
      return res.status(401).json(crs.AUTH401JWT());
    }
    req.user = jwt;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.ERR500JWT(err));
  }
};

const verifyStaff = async (req, res, next) => {
  try {
    const { role, level } = await getAuthAdminById(req.user.uid);
    req.user.role = role;
    req.user.level = level;
    if (role === "ADMIN" || role === "STAFF") {
      next();
    } else {
      return res.status(401).json(crs.ADM401JWT());
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(crs.ERR500JWT(error));
  }
};

router.use(verifyJwtMiddleware);

router.use("/auth-secured", authSecured);

router.use("/admin", verifyStaff, adminRouter);

router.use("/student/issue-history", issueHistoryRouter);

router.use("/applicant", applicantRouter);

router.use("/upload", uploadRouter);

module.exports = { router };
