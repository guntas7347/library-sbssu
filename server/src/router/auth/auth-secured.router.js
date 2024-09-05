const express = require("express");
const {
  getAuthAdminById,
  updateAuthAdminById,
} = require("../../models/auth/admin/aduth_admin.controllers");
const {
  getAuthApplicantById,
} = require("../../models/auth/applicant/auth_applicant.controllers");

const crs = require("../../utils/custom-response-codes");
const {
  checkPassword,
  createPasswordHash,
} = require("../../models/auth/functions");
const { generateRandomNumber } = require("../../utils/functions");
const {
  getAuthMember,
} = require("../../models/auth/member/auth_member.controllers");

const authSecured = express.Router();

authSecured.post("/ping", async (req, res) => {
  try {
    const desiredRole = req.body.role;

    let userAuth = null;
    switch (desiredRole[0]) {
      case "ADMIN":
        userAuth = await getAuthAdminById(req.user.uid);
        break;

      case "STAFF":
        userAuth = await getAuthAdminById(req.user.uid);
        break;

      case "APPLICANT":
        userAuth = await getAuthApplicantById(req.user.uid);

        break;

      case "STUDENT":
        userAuth = await getAuthMember({ _id: req.user.uid });

        break;

      default:
        break;
    }

    if (userAuth === null) {
      res.cookie("session", null, { expires: new Date(0) });
      return res.status(401).json(crs.AUTH401PING());
    }

    return res.status(200).json(
      crs.AUTH200PING({
        role: userAuth._doc.role,
        userName: userAuth._doc.userName,
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(401).json(crs.AUTH401PING());
  }
});

module.exports = { authSecured };
