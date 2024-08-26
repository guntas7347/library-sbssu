const {
  getAuthApplicantByEmail,
  getAuthApplicantById,
  updateAuthApplicantById,
  createAuthApplicant,
  getAuthApplicant,
} = require("../../../models/auth/applicant/auth_applicant.controllers");
const {
  getAuthStudentByEmail,
  getAuthStudentById,
} = require("../../../models/auth/student/auth_student.controllers");
const { generateEmailTemplate } = require("../../../services/email-templates");
const { transporter } = require("../../../services/nodemailer");
const crs = require("../../../utils/custom-response-codes");
const {
  generateRandomNumber,
  uuidGenerator,
} = require("../../../utils/functions");

const verifyEmailAvailabilityByEmail = async (req, res, next) => {
  try {
    const authApplicantDoc = await getAuthApplicantByEmail(req.body.email);
    const authStudentDoc = await getAuthStudentByEmail(req.body.email);
    if (authApplicantDoc !== null)
      if (authApplicantDoc._doc.otp === 111111)
        return res.status(400).json(crs.AUTH409SAPP());
    if (authStudentDoc !== null) return res.status(400).json(crs.AUTH409SAPP());
    if (!req.cust) req.cust = {};

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
    console.log(req.cust.link);

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

const fetchAuthApplicantByEmail = async (req, res, next) => {
  try {
    const authApplicantDoc = await getAuthApplicantByEmail(req.body.email);
    if (authApplicantDoc === null)
      return res.status(404).json(crs.AUTH404LAPP());

    if (!req.cust) req.cust = {};
    req.cust.authApplicantDoc = authApplicantDoc;

    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const createLink = async (req, res, next) => {
  try {
    const code = uuidGenerator(3);
    const link = `http://localhost:3000/reset-password/applicant/${code}`;
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
  fetchOTPFromDatabase,
  verifyOTP,
  markUserAsVerified,
  createApplicant,
  sendVerificationEmail,
  verifyResetLink,
  fetchAuthApplicantByEmail,
  createLink,
  verifyEmailForLogin,
  processLink,
};
