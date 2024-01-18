const express = require("express");
const {
  createAdminAccount,
  getAdminDoc,
} = require("../../../models/auth/admin/aduth_admin.controllers");
const { checkPassword } = require("../../../models/auth/functions");
const { createJWT } = require("../passport/jwt");

const emailSignOn = express.Router();

emailSignOn.post("/login", async (req, res) => {
  try {
    const adminDoc = await getAdminDoc(req.body.email);

    if (adminDoc == null) {
      return res.status(400).json({ status: "Invalid Email", payload: null });
    }

    const passwordVerification = await checkPassword(
      req.body.password,
      adminDoc._doc.password
    );

    if (!passwordVerification) {
      return res
        .status(400)
        .json({ status: "Invalid Password", payload: null });
    }
    const jwt = createJWT({ uid: adminDoc._doc._id, role: "ADMIN" });
    const cookieOptions = {
      httpOnly: true,
      sameSite: "Strict",
      expires: new Date(Date.now() + 1000 * 60 * 60),
    };
    res.cookie("session", jwt, cookieOptions);

    return res.status(200).json({ status: "LOGIN_SUCCESSFUL", payload: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Internal Server Error", payload: error });
  }
});

emailSignOn.post("/signup", async (req, res) => {
  const adminDoc = await createAdminAccount(req.body);
  return res.status(200).json({ status: "Done", payload: null });
});

module.exports = { emailSignOn };
