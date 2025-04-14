const express = require("express");

const {
  getAuthAdminById,
} = require("../../models/auth/aduth_admin.controllers");

const crs = require("../../utils/custom-response-codes");

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
