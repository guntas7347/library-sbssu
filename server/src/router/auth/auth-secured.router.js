const express = require("express");
const {
  getAuthAdminById,
  updateAuthAdminById,
  getAuthAdminByEmail,
} = require("../../models/auth/admin/aduth_admin.controllers");
const {
  getAuthApplicantById,
} = require("../../models/auth/applicant/auth_applicant.controllers");
const {
  getAuthStudentById,
} = require("../../models/auth/student/auth_student.controllers");
const crs = require("../../utils/custom-response-codes");
const {
  checkPassword,
  createPasswordHash,
} = require("../../models/auth/functions");
const { generateRandomNumber } = require("../../utils/functions");

const authSecured = express.Router();

authSecured.post("/ping", async (req, res) => {
  try {
    const desiredRole = req.body.role;
    let userAuth = null;
    switch (desiredRole) {
      case "ADMIN":
        userAuth = await getAuthAdminById(req.user.uid);
        break;

      case "STAFF":
        break;

      case "APPLICANT":
        userAuth = await getAuthApplicantById(req.user.uid);
        break;

      case "STUDENT":
        userAuth = await getAuthStudentById(req.user.uid);
        break;

      default:
        break;
    }

    if (userAuth === null) {
      res.cookie("session", null, { expires: new Date(0) });
      return res.status(401).json(crs.AUTH401PING());
    }

    return res.status(200).json(crs.AUTH200PING(desiredRole));
  } catch (err) {
    console.log(err);
    return res.status(401).json(crs.AUTH401PING());
  }
});

authSecured.post("/admin/change-password", async (req, res) => {
  try {
    const { password } = await getAuthAdminById(req.user.uid);
    if (!(await checkPassword(req.body.currentPassword, password)))
      return res.status(409).json(crs.AUTH409CAP());

    await updateAuthAdminById(req.user.uid, {
      password: await createPasswordHash(req.body.newPassword),
    });
    return res.status(200).json(crs.AUTH200CAP());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { authSecured };
