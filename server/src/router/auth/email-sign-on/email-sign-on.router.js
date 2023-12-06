const express = require("express");
const {
  createUser,
  findUser,
} = require("../../../models/auth/auth.controllers");
const { checkPassword } = require("../../../models/auth/functions");
const { createJWT } = require("../passport/jwt");

const emailSignOnRouter = express.Router();

emailSignOnRouter.post("/create-user", async (req, res) => {
  try {
    const user = await findUser(req.body.email);

    if (user !== null) {
      return res
        .status(400)
        .json({ status: "Email already exists", payload: null });
    }

    await createUser(req.body);
    return res
      .status(200)
      .json({ status: "Account created, Please Login", payload: null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Operation Failed", payload: null });
  }
});

emailSignOnRouter.post("/login", async (req, res) => {
  try {
    const user = await findUser(req.body.email);

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
    const jwtCredentials = { id: user.id, role: user.role };
    const jwt = createJWT(jwtCredentials);
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    };

    res.cookie("jwt", jwt, cookieOptions);
    return res
      .status(200)
      .json({ status: "Operation Successful", payload: user.role });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Operation Failed", payload: null });
  }
});

emailSignOnRouter.post("/sign-out", async (req, res) => {
  try {
    res.cookie("jwt", null, { expires: new Date(0) });
    return res
      .status(200)
      .json({ status: "Sign Out Successful", payload: null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Sign Out Failed", payload: error });
  }
});

module.exports = { emailSignOnRouter };
