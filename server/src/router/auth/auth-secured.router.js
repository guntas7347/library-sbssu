const express = require("express");

const {
  getAuthAdminById,
} = require("../../models/auth/aduth_admin.controllers");

const crs = require("../../utils/custom-response-codes");
const Auth = require("../../models/auth/auth.schema");
const { createLog } = require("../../utils/functions");
const { logger_7 } = require("../../services/logger");
const Log = require("../../models/logs/log.schema");

const authSecured = express.Router();

authSecured.post("/ping", async (req, res) => {
  try {
    const desiredRole = req.body.role;

    let authDoc = null;
    let userAuth = null;
    switch (desiredRole[0]) {
      case "STAFF":
        authDoc = await Auth.findById(req.user.uid)
          .where({ active: true })
          .select("email role -_id")
          .populate({ path: "staffId", select: "fullName -_id" })
          .lean();
        if (!authDoc) break;
        userAuth = authDoc;
        break;

      default:
        break;
    }

    if (userAuth === null) {
      res.cookie("session", null, { expires: new Date(0) });
      return res.status(401).json(crs.AUTH401PING());
    }

    return res.status(200).json(crs.AUTH200PING(userAuth));
  } catch (error) {
    createLog(error);
    return res.status(401).json(crs.AUTH401PING());
  }
});

authSecured.post("/sign-out", async (req, res) => {
  try {
    const { email } = await Auth.findById(req.user.uid)
      .select("email -_id")
      .lean();
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    await Log.create({
      event: "staff_logout",
      userId: req.user.uid,
      email,
      ip,
    });
    res.cookie("session", null, { expires: new Date(0) });
    return res.status(200).json(crs.AUTH200SOUT());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

module.exports = { authSecured };
