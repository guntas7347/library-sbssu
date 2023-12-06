const express = require("express");
const { settingsRouter } = require("./admin/settings/settings.router.admin");
const {
  issueHistoryRouter,
} = require("./student/issue-history/issue-history.router.student");
const { authRouter } = require("./auth/auth.router");
const { applicantRouter } = require("./applicant/applicant.router");
const { verifyJwt } = require("./auth/passport/jwt");
const { adminRouter } = require("./admin/admin.router");
const { getAuthRoleById } = require("../models/auth/auth.controllers");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin/settings", settingsRouter);

const verifyJwtMiddleware = (req, res, next) => {
  try {
    const jwt = verifyJwt(req.cookies.jwt);
    if (jwt === null) {
      res.cookie("jwt", null, { expires: new Date(0) });
      return res
        .status(401)
        .json({ status: "Authenticaltion Failed", payload: null });
    } else {
      req.user = jwt;

      next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ status: "Authenticaltion Failed", payload: null });
  }
};

router.use(verifyJwtMiddleware);

const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "ADMIN") {
      next();
    } else {
      return res
        .status(401)
        .json({ status: "Authenticaltion Failed", payload: null });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Authenticaltion Failed", payload: null });
  }
};

router.post("/auth/ping", async (req, res) => {
  try {
    const userAuth = await getAuthRoleById(req.user.id);

    if (userAuth === null) {
      res.cookie("jwt", null, { expires: new Date(0) });
      return res
        .status(401)
        .json({ status: "Authenticaltion Failed", payload: null });
    }

    return res.status(200).json({ status: userAuth._doc.role, payload: null });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "Authenticaltion Failed", payload: null });
  }
});

router.use("/admin", verifyAdmin, adminRouter);

router.use("/student/issue-history", issueHistoryRouter);

router.use("/applicant", applicantRouter);

module.exports = { router };
