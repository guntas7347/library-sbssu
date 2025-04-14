const express = require("express");
const crs = require("../../../utils/custom-response-codes");
const {
  verifyEmailForLogin,
  fetchAuthAdminByEmail,
  createLink,
  processLink,
  verifyResetLink,
  sendVerificationEmail,
} = require("./admin.auth.middlewares");
const { verifyPassword, setJwtCookie } = require("../auth.middlewares");
const {
  updateAuthAdmin,
} = require("../../../models/auth/aduth_admin.controllers");
const { uuidGenerator } = require("../../../utils/functions");
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
  "/dispatch-reset-link",
  fetchAuthAdminByEmail,
  createLink,
  processLink,
  sendVerificationEmail,
  async (req, res) => {
    try {
      console.log(req.cust.link);
      return res.status(200).json(crs.AUTH200LDPS());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

adminRouter.post("/verify-reset-link", verifyResetLink, async (req, res) => {
  try {
    return res.status(200).json(crs.AUTH200LVFS());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

adminRouter.post("/reset-password", async (req, res) => {
  try {
    const password = await createPasswordHash(req.body.password);
    await updateAuthAdmin(
      { resetCode: req.body.code },
      { password, resetCode: uuidGenerator(3) }
    );
    return res.status(200).json(crs.AUTH200RAP());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
}); //reset-password

module.exports = { adminRouter };
