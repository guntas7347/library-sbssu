const express = require("express");
const {
  createApplicantAuth,
  getApplicantAuthOtpById,
  getApplicantAuthIdByEmail,
  markApplicantAuthAsVerified,
} = require("../../../../models/auth/auth_applicant.controllers");
const {
  generateOtpEmailTemplate,
} = require("../../../../services/email-templates");
const { transporter } = require("../../../../services/nodemailer");

const emailSignOnRouter = express.Router();

emailSignOnRouter.post("/create-user/send-otp", async (req, res) => {
  try {
    // const user = await findUser(req.body.email);

    // if (user !== null) {
    //   return res
    //     .status(400)
    //     .json({ status: "Email already exists", payload: null });
    // }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    transporter.sendMail({
      from: "sandhugameswithjoy@gmail.com",
      to: req.body.email,
      subject: "Account Verification",
      html: generateOtpEmailTemplate(req.body.displayName, otp),
    });

    await createApplicantAuth(req.body, otp);
    const { _id } = await getApplicantAuthIdByEmail(req.body.email);

    console.log(`One Time Password: ${otp}`);

    return res.status(200).json({
      status: "Please enter OTP that you recieved via your email",
      payload: _id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Operation Failed", payload: null });
  }
});

emailSignOnRouter.post("/create-user/verify-otp", async (req, res) => {
  try {
    const applicantDoc = await getApplicantAuthOtpById(req.body._id);

    if (applicantDoc._doc.otp !== req.body.otp) {
      return res.status(400).json({
        status: "Invalid OTP",
        payload: null,
      });
    }

    await markApplicantAuthAsVerified(req.body._id);

    return res.status(200).json({
      status: "Account Created Successfully",
      payload: null,
    });
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
