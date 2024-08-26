const express = require("express");
const { settingsRouter } = require("./admin/settings/settings.router.admin");
const {
  issueHistoryRouter,
} = require("./student/issue-history/issue-history.router.student");
const { authRouter } = require("./auth/auth.router");
const { applicantRouter } = require("./applicant/applicant.router");
const { verifyJwt, decrptText } = require("./auth/jwt");
const { adminRouter } = require("./admin/admin.router");
const { addNewBook } = require("../models/books/books.controllers");

const mongoose = require("mongoose");
const crs = require("../utils/custom-response-codes");
const {
  getAuthApplicantById,
} = require("../models/auth/applicant/auth_applicant.controllers");
const {
  getAuthAdminById,
} = require("../models/auth/admin/aduth_admin.controllers");
const {
  getAuthStudentById,
} = require("../models/auth/student/auth_student.controllers");
const { authSecured } = require("./auth/auth-secured.router");

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

const verifyAdmin = async (req, res, next) => {
  try {
    const { role } = await getAuthAdminById(req.user.uid);
    if (role === "ADMIN") {
      next();
    } else {
      return res.status(401).json(crs.ADM401JWT());
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(crs.ERR500JWT(error));
  }
};

const verifyStaff = async (req, res, next) => {
  try {
    const { role } = await getAuthAdminById(req.user.uid);

    if (role === "STAFF") {
      next();
    } else {
      return res.status(401).json(crs.STF401JWT());
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(crs.ERR500JWT(error));
  }
};

router.use(verifyJwtMiddleware);

router.use("/auth-secured", authSecured);

router.use("/admin", verifyAdmin, adminRouter);

router.use("/staff", verifyStaff, adminRouter);

router.use("/student/issue-history", issueHistoryRouter);

router.use("/applicant", applicantRouter);

router.post("/test", async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await addNewBook({ title: "Hello", author: "good" }, session);
      await addNewBook({ title: "Hello" }, session);
    });
    await session.commitTransaction();
    return res.status(200).json({ status: "Done" });
  } catch (error) {
    console.log(error);
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return res.status(500).json({ status: "Failed" });
  } finally {
    session.endSession();
  }
});

module.exports = { router };
