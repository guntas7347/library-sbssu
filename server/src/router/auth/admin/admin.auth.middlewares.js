const {
  getAuthAdminByEmail,
  updateAuthAdminById,
} = require("../../../models/auth/admin/aduth_admin.controllers");
const crs = require("../../../utils/custom-response-codes");
const { generateRandomNumber } = require("../../../utils/functions");

const verifyEmailForLogin = async (req, res, next) => {
  try {
    const authAdminDoc = await getAuthAdminByEmail(req.body.email);
    if (authAdminDoc == null) return res.status(404).json(crs.AUTH404ADM());
    if (!req.cust) req.cust = {};
    req.cust.password = req.body.password;
    req.cust.hash = authAdminDoc._doc.password;
    req.cust._id = authAdminDoc._doc._id;
    req.cust.role = authAdminDoc._doc.role;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const fetchAuthAdminByEmail = async (req, res, next) => {
  try {
    const authAdminDoc = await getAuthAdminByEmail(req.body.email);
    if (!authAdminDoc) return res.status(409).json(crs.AUTH404RAPI());
    if (!req.cust) req.cust = {};
    req.cust.authAdminDoc = authAdminDoc;
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const createOtp = async (req, res, next) => {
  try {
    const { authAdminDoc } = req.cust;
    const otp = generateRandomNumber();
    await updateAuthAdminById(authAdminDoc._id, {
      resetPass: {
        code: otp,
        createdAt: new Date(),
        used: false,
        attempts: 0,
      },
    });
    console.log(`One Time Password: ${otp}`);
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { authAdminDoc } = req.cust;
    const { resetPass } = authAdminDoc._doc;
    if (resetPass.attempts > 2) return res.status(402).json(crs.AUTH402RAPV());
    const attempts = resetPass.attempts + 1;
    if (resetPass.code !== +req.body.otp) {
      await updateAuthAdminById(authAdminDoc._id, {
        resetPass: {
          ...resetPass,
          attempts,
        },
      });
      return res.status(409).json(crs.AUTH401RAPV());
    }
    next();
  } catch (err) {
    return res.status(500).json(crs.SERR500REST(err));
  }
};

module.exports = {
  verifyEmailForLogin,
  fetchAuthAdminByEmail,
  createOtp,
  verifyOtp,
};
