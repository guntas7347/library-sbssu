const express = require("express");
const {
  createUser,
  findUser,
  changePassword,
} = require("../../../models/auth/auth.controllers");
const { checkPassword } = require("../../../models/auth/functions");
const { createJWT } = require("../passport/jwt");
const { transporter } = require("../../../services/nodemailer");
const Mailgen = require("mailgen");

const emailSignOnRouter = express.Router();

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Library SBSSU",
    link: "https://sbssu.ac.in/",
    logo: "https://sbssu.ac.in/images/Tricolor.png",
  },
});

emailSignOnRouter.post("/create-user/send-otp", async (req, res) => {
  try {
    const user = await findUser(req.body.email);

    if (user !== null) {
      return res
        .status(400)
        .json({ status: "Email already exists", payload: null });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    var emailBody = mailGenerator.generate({
      body: {
        name: req.body.displayName,
        intro: [
          "Welcome to Shaheed Bhagat Singh State University's Centeral Library! We're very excited to have you on board.",
          `One Time Password for your accession verification is ${otp}`,
        ],
        outro:
          "Need help, or have questions? Contact Library in working hours, we'd love to help.",
      },
    });

    transporter.sendMail({
      from: "sandhugameswithjoy@gmail.com",
      to: req.body.email,
      subject: "Accession Verification",
      html: emailBody,
    });

    await createUser(req.body);
    return res
      .status(200)
      .json({ status: "Accession created, Please Login", payload: null });
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
