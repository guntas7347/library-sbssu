const express = require("express");

const {
  getAuthAdminById,
} = require("../../models/auth/admin/aduth_admin.controllers");
const {
  getAuthApplicantById,
} = require("../../models/auth/applicant/auth_applicant.controllers");

const crs = require("../../utils/custom-response-codes");

const {
  getAuthMember,
} = require("../../models/auth/member/auth_member.controllers");

const authSecured = express.Router();

authSecured.post("/ping", async (req, res) => {
  try {
    const desiredRole = req.body.role;

    let authDoc = null;
    let userAuth = null;
    switch (desiredRole[0]) {
      case "STAFF":
        authDoc = await getAuthAdminById(req.user.uid);
        if (!authDoc) break;
        userAuth = {};
        userAuth.userName = authDoc.userName;
        userAuth.role = "STAFF";
        break;

      case "APPLICANT":
        authDoc = await getAuthApplicantById(req.user.uid);
        if (!authDoc) break;
        userAuth = {};
        userAuth.userName = authDoc.userName;
        userAuth.role = "APPLICANT";
        break;

      case "STUDENT":
        authDoc = await getAuthMember({ _id: req.user.uid });
        if (!authDoc) break;
        userAuth = {};
        userAuth.userName = authDoc.userName;
        userAuth.role = "STUDENT";
        break;

      default:
        break;
    }

    if (userAuth === null) {
      res.cookie("session", null, { expires: new Date(0) });
      return res.status(401).json(crs.AUTH401PING());
    }

    return res.status(200).json(crs.AUTH200PING(userAuth));
  } catch (err) {
    console.log(err);
    return res.status(401).json(crs.AUTH401PING());
  }
});

module.exports = { authSecured };
