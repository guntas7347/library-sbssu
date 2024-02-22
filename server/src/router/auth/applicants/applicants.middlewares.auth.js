const {
  getAuthApplicantByEmail,
  getAuthApplicantById,
  updateAuthApplicantById,
  createAuthApplicant,
} = require("../../../models/auth/applicant/auth_applicant.controllers");
const {
  getAuthStudentByEmail,
  getAuthStudentById,
} = require("../../../models/auth/student/auth_student.controllers");
const { generateEmailTemplate } = require("../../../services/email-templates");
const { transporter } = require("../../../services/nodemailer");
const crs = require("../../../utils/custom-response-codes");
const { generateRandomNumber } = require("../../../utils/functions");

const verifyEmailAvailabilityByEmail = async (req, res, next) => {
  try {
    const authApplicantDoc = await getAuthApplicantByEmail(req.body.email);
    const authStudentDoc = await getAuthStudentByEmail(req.body.email);
    if (authApplicantDoc !== null)
      if (authApplicantDoc._doc.otp === 111111)
        return res.status(400).json(crs.AUTH409SAPP());
    if (authStudentDoc !== null) return res.status(400).json(crs.AUTH409SAPP());
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchOTPFromDatabase = async (req, res, next) => {
  try {
    const authApplicantDoc = await getAuthApplicantById(req.body._id);

    if (authApplicantDoc === null)
      return res.status(404).json(crs.AUTH409SAPP());

    const { otp, createdAt } = authApplicantDoc;

    if (!req.cust) req.cust = {};
    req.cust.otp = otp;
    req.cust.createdAt = createdAt;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const otp = req.cust.otp;
    const createdAt = req.cust.createdAt;

    if (otp === 111111) return res.status(409).json(crs.AUTH409VAPP());

    const otpTimeOut = (minutes = 10) => {
      const gap = new Date().getTime() - new Date(createdAt).getTime();
      if (gap > 1000 * 60 * minutes) return true;
      else return false;
    };

    if (otpTimeOut(10)) return res.status(400).json(crs.AUTH403VAPP());
    if (otp !== req.body.otp) return res.status(400).json(crs.AUTH400VAPP());

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

const createUserAndOTP = async (req, res, next) => {
  try {
    const otp = generateRandomNumber(6, [111111]);
    await createAuthApplicant(req.body, otp);
    const applicantDoc = await getAuthApplicantByEmail(req.body.email);
    if (!req.cust) req.cust = {};
    req.cust.otp = otp;
    req.cust.applicantDoc = applicantDoc;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const sendVerificationEmail = async (req, res, next) => {
  try {
    const otp = req.cust.otp;
    console.log(`One Time Password: ${otp}`);
    // transporter.sendMail({
    //   from: "sandhugameswithjoy@gmail.com",
    //   to: req.body.email,
    //   subject: "Account Verification",
    //   html: generateEmailTemplate.otp(req.body.displayName, otp),
    // });
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyEmailForLogin = async (req, res, next) => {
  try {
    const authApplicantDoc = await getAuthApplicantByEmail(req.body.email);
    if (authApplicantDoc === null)
      return res.status(404).json(crs.AUTH404LAPP());
    if (!req.cust) req.cust = {};
    req.cust.password = req.body.password;
    req.cust.hash = authApplicantDoc._doc.password;
    req.cust._id = authApplicantDoc._doc._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

module.exports = {
  verifyEmailAvailabilityByEmail,
  fetchOTPFromDatabase,
  verifyOTP,
  markUserAsVerified,
  createUserAndOTP,
  createUserAndOTP,
  sendVerificationEmail,
  verifyEmailForLogin,
};
