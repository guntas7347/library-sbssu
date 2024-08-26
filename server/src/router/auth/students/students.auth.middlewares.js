const {
  getAuthStudentByEmail,
  createAuthStudent,
  updateAuthStudentById,
  getAuthStudent,
} = require("../../../models/auth/student/auth_student.controllers");
const { generateEmailTemplate } = require("../../../services/email-templates");
const { transporter } = require("../../../services/nodemailer");
const crs = require("../../../utils/custom-response-codes");
const {
  generateRandomNumber,
  uuidGenerator,
} = require("../../../utils/functions");

const verifyEmailForLogin = async (req, res, next) => {
  try {
    const authStudentDoc = await getAuthStudentByEmail(req.body.email);
    if (authStudentDoc === null) return res.status(404).json(crs.AUTH404STU());
    if (!req.cust) req.cust = {};
    req.cust.password = req.body.password;
    req.cust.hash = authStudentDoc._doc.password;
    req.cust._id = authStudentDoc._doc._id;
    req.cust.authStudentDoc = authStudentDoc;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyEmailAvailabilityByEmail = async (req, res, next) => {
  try {
    const authStudentDoc = await getAuthStudentByEmail(req.body.email);
    if (authStudentDoc !== null) return res.status(400).json(crs.AUTH409SAPP());
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const createUserAndOTP = async (req, res, next) => {
  try {
    const otp = generateRandomNumber(6, [111111]);
    await createAuthStudent(req.body, otp);
    const studentDoc = await getAuthStudentByEmail(req.body.email);

    if (!req.cust) req.cust = {};
    req.cust.otp = otp;
    req.cust.studentDoc = studentDoc;
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

const createLink = async (req, res, next) => {
  try {
    const code = uuidGenerator(3);
    const link = `http://localhost:3000/reset-password/student/${code}`;
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
    await updateAuthStudentById(req.cust.authStudentDoc._id, {
      resetCode: req.cust.code,
      resetCodeTime: new Date(),
    });

    // transporter.sendMail({
    //   from: "sandhugameswithjoy@gmail.com",
    //   to: req.body.email,
    //   subject: "Password Reset Link",
    //   html: generateEmailTemplate.resetPassword(
    //     req.cust.authStudentDoc.name,
    //     req.cust.link
    //   ),
    // });
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyResetLink = async (req, res, next) => {
  try {
    const { type, code } = req.body;
    if (type !== "student") return res.status(404).json(crs.AUTH404LDPS());
    const authStudent = await getAuthStudent({ resetCode: code });
    if (authStudent === null) return res.status(404).json(crs.AUTH404LDPS());

    const resetCodeTime = new Date(authStudent.resetCodeTime);
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
  verifyEmailForLogin,
  verifyEmailAvailabilityByEmail,
  createUserAndOTP,
  sendVerificationEmail,
  createLink,
  processLink,
  verifyResetLink,
};
