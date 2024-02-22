const express = require("express");
const crs = require("../../../utils/custom-response-codes");
const {
  verifyEmailForLogin,
  fetchAuthAdminByEmail,
  verifyOtp,
  createOtp,
} = require("./admin.auth.middlewares");
const { verifyPassword, setJwtCookie } = require("../auth.middlewares");
const {
  createAuthAdmin,
  getAuthAdminByEmail,
  updateAuthAdminById,
  getAuthAdminById,
} = require("../../../models/auth/admin/aduth_admin.controllers");
const { generateRandomNumber } = require("../../../utils/functions");
const { createPasswordHash } = require("../../../models/auth/functions");

const adminRouter = express.Router();

adminRouter.post(
  "/login",
  verifyEmailForLogin,
  verifyPassword,
  setJwtCookie,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200ADM(req.cust.role));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

adminRouter.post(
  "/reset-password-init",
  fetchAuthAdminByEmail,
  createOtp,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200RAPI());
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

adminRouter.post(
  "/reset-password-verify",
  fetchAuthAdminByEmail,
  verifyOtp,
  async (req, res) => {
    try {
      return res.status(200).json(crs.AUTH200RAPV());
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

adminRouter.post(
  "/reset-password",
  fetchAuthAdminByEmail,
  verifyOtp,
  async (req, res) => {
    try {
      const { authAdminDoc } = req.cust;
      const password = await createPasswordHash(req.body.newPassword);
      await updateAuthAdminById(authAdminDoc._id, { password });
      return res.status(200).json(crs.AUTH200RAP());
    } catch (err) {
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

module.exports = { adminRouter };
