const express = require("express");
const { adminRouter } = require("./admin/admin.auth.router");
const crs = require("../../utils/custom-response-codes");

const authRouter = express.Router();

authRouter.use("/admin", adminRouter);

authRouter.post("/clear-session", async (req, res) => {
  try {
    res.cookie("session", null, { expires: new Date(0) });
    return res.status(200).json(crs.AUTH200SOUT());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
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
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

module.exports = { authRouter };
