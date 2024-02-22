const express = require("express");
const { applicantsAuthRouter } = require("./applicants/applicants.auth.router");
const { studentRouter } = require("./students/students-router.auth.router");
const { adminRouter } = require("./admin/admin.auth.router");
const crs = require("../../utils/custom-response-codes");

const authRouter = express.Router();

authRouter.use("/applicants", applicantsAuthRouter);
authRouter.use("/admin", adminRouter);
authRouter.use("/students", studentRouter);

authRouter.post("/sign-out", async (req, res) => {
  try {
    res.cookie("session", null, { expires: new Date(0) });
    return res.status(200).json(crs.AUTH200SOUT());
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { authRouter };
