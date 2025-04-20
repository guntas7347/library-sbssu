const {
  updateAuthAdminById,
  getAuthAdmin,
} = require("../../../models/auth/aduth_admin.controllers");
const { generateEmailTemplate } = require("../../../services/email-templates");
const { transporter } = require("../../../services/nodemailer");
const crs = require("../../../utils/custom-response-codes");
const { uuidGenerator } = require("../../../utils/functions");

const verifyEmailForLogin = async (req, res, next) => {
  try {
    const authAdminDoc = await getAuthAdmin({
      email: req.body.email.toLowerCase(),
    });
    if (authAdminDoc == null) return res.status(404).json(crs.AUTH404ADM());
    if (!req.cust) req.cust = {};
    req.cust.password = req.body.password;
    req.cust.hash = authAdminDoc._doc.password;
    req.cust._id = authAdminDoc._doc._id;
    req.cust.role = authAdminDoc._doc.role;
    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchAuthAdminByEmail = async (req, res, next) => {
  try {
    const authAdminDoc = await getAuthAdmin({ email: req.body.email });
    if (!authAdminDoc) return res.status(409).json(crs.AUTH404RAPI());
    if (!req.cust) req.cust = {};
    req.cust.authAdminDoc = authAdminDoc;
    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const createLink = async (req, res, next) => {
  try {
    const code = uuidGenerator(3);
    const link = `${req.body.url}/reset-password/${code}`;
    req.cust.code = code;
    req.cust.link = link;
    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const processLink = async (req, res, next) => {
  try {
    await updateAuthAdminById(req.cust.authAdminDoc._id, {
      resetCode: req.cust.code,
      resetCodeTime: new Date(),
    });
    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyResetLink = async (req, res, next) => {
  try {
    const { type, code } = req.body;
    if (type !== "admin") return res.status(404).json(crs.AUTH404LDPS());
    const authAdmin = await getAuthAdmin({ resetCode: code });
    if (authAdmin === null) return res.status(404).json(crs.AUTH404LDPS());
    const resetCodeTime = new Date(authAdmin.resetCodeTime);
    const timePassed =
      (new Date().getTime() - resetCodeTime.getTime()) / 1000 / 60;

    if (timePassed > 10) return res.status(404).json(crs.AUTH404LDPS());

    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const sendVerificationEmail = async (req, res, next) => {
  try {
    transporter.sendMail({
      from: "librarysbssu@gmail.com",
      to: req.cust.authAdminDoc.email,
      subject: "Reset Password",
      html: generateEmailTemplate.resetPassword(
        req.cust.authAdminDoc.userName,
        req.cust.link
      ),
    });

    next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

module.exports = {
  verifyEmailForLogin,
  fetchAuthAdminByEmail,
  createLink,
  processLink,
  verifyResetLink,
  sendVerificationEmail,
};
