const express = require("express");
const {
  findStudentAuth,
} = require("../../../models/auth/student/auth_student.controllers");

const emailSignOn = express.Router();

emailSignOn.post("/login", async (req, res) => {
  const studentDoc = await findStudentAuth(req.body.email);
  return res.status(200).json({ status: "Done", payload: null });
});

module.exports = { emailSignOn };
