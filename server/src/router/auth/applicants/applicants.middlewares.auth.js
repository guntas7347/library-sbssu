require("dotenv").config();

const {
  getAuthApplicantByEmail,
  updateAuthApplicantById,
  createAuthApplicant,
  getAuthApplicant,
} = require("../../../models/auth/applicant/auth_applicant.controllers");

const { getMember } = require("../../../models/member/member.controllers");
const { generateEmailTemplate } = require("../../../services/email-templates");
const { transporter } = require("../../../services/nodemailer");
const crs = require("../../../utils/custom-response-codes");
const { uuidGenerator } = require("../../../utils/functions");

const verifyEmailAvailabilityByEmail = async (req, res, next) => {
  try {
    const authApplicant = await getAuthApplicant({ email: req.body.email });
    if (authApplicant) return res.status(400).json(crs.AUTH409SAPP());

    const member = await getMember({ email: req.body.email });
    if (member) return res.status(400).json(crs.AUTH409SAPP());

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const markUserAsVerified = async (req, res, next) => {
  try {
    await updateAuthApplicantById(req.body._id, { otp: 111111 });
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const createApplicant = async (req, res, next) => {
  try {
    await createAuthApplicant(req.body);
    const authApplicantDoc = await getAuthApplicantByEmail(req.body.email);
    if (!req.cust) req.cust = {};
    req.cust.authApplicantDoc = authApplicantDoc;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const sendVerificationEmail = async (req, res, next) => {
  try {
    transporter.sendMail({
      from: "librarysbssu@gmail.com",
      to: req.cust.authApplicantDoc.email,
      subject: "Reset Password",
      html: generateEmailTemplate.resetPassword(
        req.cust.authApplicantDoc.userName,
        req.cust.link
      ),
    });

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchAuthApplicantByEmail = async (req, res, next) => {
  try {
    const authApplicantDoc = await getAuthApplicantByEmail(req.body.email);
    if (authApplicantDoc === null)
      return res.status(404).json(crs.AUTH404LAPP());

    if (!req.cust) req.cust = {};
    req.cust.authApplicantDoc = authApplicantDoc;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const createLink = async (req, res, next) => {
  try {
    const code = uuidGenerator(3);
    const link = `${process.env.APP_URL}/reset-password/applicant/${code}`;
    if (!req.cust) req.cust = {};
    req.cust.code = code;
    req.cust.link = link;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const processLink = async (req, res, next) => {
  try {
    await updateAuthApplicantById(req.cust.authApplicantDoc._id, {
      resetCode: req.cust.code,
      resetCodeTime: new Date(),
    });
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyEmailForLogin = async (req, res, next) => {
  try {
    const authApplicantDoc = await getAuthApplicantByEmail(req.body.email);
    if (authApplicantDoc == null) return res.status(404).json(crs.AUTH404ADM());
    if (!req.cust) req.cust = {};
    req.cust.password = req.body.password;
    req.cust.hash = authApplicantDoc._doc.password;
    req.cust._id = authApplicantDoc._doc._id;
    req.cust.role = authApplicantDoc._doc.role;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyResetLink = async (req, res, next) => {
  try {
    const { type, code } = req.body;
    if (type !== "applicant") return res.status(404).json(crs.AUTH404LDPS());
    const authApplicant = await getAuthApplicant({ resetCode: code });
    if (authApplicant === null) return res.status(404).json(crs.AUTH404LDPS());
    const resetCodeTime = new Date(authApplicant.resetCodeTime);
    const timePassed =
      (new Date().getTime() - resetCodeTime.getTime()) / 1000 / 60;

    if (timePassed > 10) return res.status(404).json(crs.AUTH404LDPS());

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

module.exports = {
  verifyEmailAvailabilityByEmail,
  markUserAsVerified,
  createApplicant,
  sendVerificationEmail,
  verifyResetLink,
  fetchAuthApplicantByEmail,
  createLink,
  verifyEmailForLogin,
  processLink,
};
