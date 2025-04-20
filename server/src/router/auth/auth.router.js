const express = require("express");
const { adminRouter } = require("./admin/admin.auth.router");
const crs = require("../../utils/custom-response-codes");

const authRouter = express.Router();

authRouter.use("/admin", adminRouter);

authRouter.post("/sign-out", async (req, res) => {
  try {
    res.cookie("session", null, { expires: new Date(0) });
    return res.status(200).json(crs.AUTH200SOUT());
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

authRouter.post("/verify-recaptcha", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`,
      }
    );
    const json = await response.json();
    return res.status(200).json(crs.AUTH200RECAPTCHA(json));
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { authRouter };
