const express = require("express");
const speakeasy = require("speakeasy");
const crs = require("../../../utils/custom-response-codes");
const {
  verifyEmailForLogin,
  fetchAuthAdminByEmail,
  createLink,
  processLink,
  verifyResetLink,
  sendVerificationEmail,
  create2FA,
  createQrFor2FA,
  verify2FA,
  populate2FaSecret,
} = require("./admin.auth.middlewares");
const { verifyPassword, setJwtCookie } = require("../auth.middlewares");

const { uuidGenerator, createLog } = require("../../../utils/functions");
const { createPasswordHash } = require("../../../models/auth/functions");
const {
  validateStrongPassword,
  validateLoginCreds,
} = require("../../validator");
const Auth = require("../../../models/auth/auth.schema");
const { logger_7 } = require("../../../services/logger");
const Log = require("../../../models/logs/log.schema");

const adminRouter = express.Router();

adminRouter.post(
  "/login",
  validateLoginCreds,
  verifyEmailForLogin,
  verifyPassword,
  verify2FA,
  setJwtCookie,
  async (req, res) => {
    try {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      await Log.create({
        event: "staff_login",
        userId: req.cust._id,
        email: req.body.email.toLowerCase(),
        ip,
      });

      return res.status(200).json(crs.AUTH200ADM(req.cust.role));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //login

adminRouter.post(
  "/dispatch-reset-link",
  fetchAuthAdminByEmail,
  createLink,
  processLink,
  sendVerificationEmail,
  async (req, res) => {
    try {
      console.log(req.cust.link);
      return res.status(200).json(crs.AUTH200LDPS());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //dispatch-reset-link

adminRouter.post(
  "/verify-reset-link",
  verifyResetLink,
  create2FA,
  createQrFor2FA,
  async (req, res) => {
    try {
      await Auth.findOneAndUpdate(
        { resetCode: req.body.code },
        { twoFaSecret: req.cust.base32 }
      );
      return res.status(200).json(crs.AUTH200LVFS(req.cust.qrData));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //verify-reset-link

adminRouter.post(
  "/reset-password",
  validateStrongPassword,
  populate2FaSecret,
  verify2FA,
  async (req, res) => {
    try {
      const password = await createPasswordHash(req.body.password);
      await Auth.findByIdAndUpdate(req.cust.authDoc._id, {
        password,
        resetCode: uuidGenerator(3),
      });
      return res.status(200).json(crs.AUTH200RAP());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //reset-password

module.exports = { adminRouter };
