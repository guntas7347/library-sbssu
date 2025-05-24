const speakeasy = require("speakeasy");
var QRCode = require("qrcode");

const {
  updateAuthAdminById,
  getAuthAdmin,
} = require("../../../models/auth/aduth_admin.controllers");
const { generateEmailTemplate } = require("../../../services/email-templates");
const { transporter } = require("../../../services/nodemailer");
const crs = require("../../../utils/custom-response-codes");
const { uuidGenerator, createLog } = require("../../../utils/functions");
const Auth = require("../../../models/auth/auth.schema");

const verifyEmailForLogin = async (req, res, next) => {
  try {
    const authDoc = await Auth.findOne({
      email: req.body.email.toLowerCase(),
    }).lean();
    if (!authDoc) return res.status(404).json(crs.AUTH404ADM());
    if (!req.cust) req.cust = {};
    req.cust.password = req.body.password;
    req.cust.hash = authDoc.password;
    req.cust._id = authDoc._id;
    req.cust.role = authDoc.role;
    req.cust.secret = authDoc.twoFaSecret;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const fetchAuthAdminByEmail = async (req, res, next) => {
  try {
    const authAdminDoc = await getAuthAdmin({ email: req.body.email });
    if (!authAdminDoc) return res.status(409).json(crs.AUTH404RAPI());
    if (!req.cust) req.cust = {};
    req.cust.authAdminDoc = authAdminDoc;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const createLink = async (req, res, next) => {
  try {
    const code = uuidGenerator(3);
    const link = `${req.body.url}/admin/reset-password/${code}`;
    req.cust.code = code;
    req.cust.link = link;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const processLink = async (req, res, next) => {
  try {
    await updateAuthAdminById(req.cust.authAdminDoc._id, {
      resetCode: req.cust.code,
      resetCodeTime: new Date(),
    });
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const verifyResetLink = async (req, res, next) => {
  try {
    const { type, code } = req.body;
    if (type !== "admin") return res.status(404).json(crs.AUTH404LDPS());
    const authAdmin = await Auth.findOne({ resetCode: code }).lean();
    if (!authAdmin) return res.status(404).json(crs.AUTH404LDPS());
    const resetCodeTime = new Date(authAdmin.resetCodeTime);
    const timePassed =
      (new Date().getTime() - resetCodeTime.getTime()) / 1000 / 60;
    if (timePassed > 10) return res.status(404).json(crs.AUTH404LDPS());

    if (!req.cust) req.cust = {};
    req.cust.email = authAdmin.email;

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const sendVerificationEmail = async (req, res, next) => {
  try {
    transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: req.cust.authAdminDoc.email,
      subject: "Reset Password",
      html: generateEmailTemplate.resetPassword(
        req.cust.authAdminDoc.userName,
        req.cust.link
      ),
    });

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const create2FA = async (req, res, next) => {
  try {
    let name = "Library SBSSU";
    if (req.cust?.email) name = `${name}: ${req.cust.email}`;

    const { base32, otpauth_url } = speakeasy.generateSecret({
      name,
    });

    if (!req.cust) req.cust = {};
    req.cust.otpauth_url = otpauth_url;
    req.cust.base32 = base32;

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const verify2FA = async (req, res, next) => {
  try {
    const verified = speakeasy.totp.verify({
      secret: req.cust.secret,
      encoding: "base32",
      token: req.body.totp,
      window: 1,
    });

    if (!verified) return res.status(401).json(crs.AUTH401RAPV());
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const createQrFor2FA = async (req, res, next) => {
  try {
    const qrData = await QRCode.toDataURL(req.cust.otpauth_url);
    req.cust.qrData = qrData;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const populate2FaSecret = async (req, res, next) => {
  try {
    const authDoc = await Auth.findOne({ resetCode: req.body.code })
      .select("twoFaSecret")
      .lean();
    req.cust = {};
    req.cust.secret = authDoc.twoFaSecret;
    req.cust.authDoc = authDoc;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = {
  verifyEmailForLogin,
  fetchAuthAdminByEmail,
  createLink,
  processLink,
  verifyResetLink,
  sendVerificationEmail,
  create2FA,
  createQrFor2FA,
  verify2FA,
  populate2FaSecret,
};
