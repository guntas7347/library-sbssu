const express = require("express");
const {
  findStudentAuth,
} = require("../../../models/auth/student/auth_student.controllers");
const { createJWT } = require("../passport/jwt");
const { checkPassword } = require("../../../models/auth/functions");

const emailSignOn = express.Router();

emailSignOn.post("/login", async (req, res) => {
  try {
    const user = await findStudentAuth(req.body.email);

    if (user === null) {
      return res
        .status(400)
        .json({ status: "User does not exists", payload: null });
    }

    const verifyPassword = await checkPassword(
      req.body.password,
      user.password
    );

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ status: "Invalid Password", payload: null });
    }

    const jwtCredentials = { uid: user.id, role: "STUDENT" };
    const jwt = createJWT(jwtCredentials);
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    };

    res.cookie("session", jwt, cookieOptions);
    return res
      .status(200)
      .json({ status: "Operation Successful", payload: null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Operation Failed", payload: null });
  }
});

module.exports = { emailSignOn };
