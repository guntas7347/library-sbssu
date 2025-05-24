const { getAuthAdminById } = require("../models/auth/aduth_admin.controllers");
const Auth = require("../models/auth/auth.schema");
const crs = require("../utils/custom-response-codes");
const { verifyJwt, decrptText } = require("./auth/jwt");

const verifyJwtMiddleware = (req, res, next) => {
  try {
    const jwt = req.cookies.session
      ? verifyJwt(decrptText(req.cookies.session))
      : null;

    if (jwt === null) {
      res.cookie("session", null, {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      return res.status(401).json(crs.AUTH401JWT());
    }
    req.user = jwt;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.ERR500JWT(error));
  }
};

const verifyStaff = async (req, res, next) => {
  try {
    const { role, rights } = await Auth.findById(req.user.uid).lean();
    if (!role) return res.status(401).json(crs.ADM401JWT());
    req.user.role = role;
    req.user.rights = rights;
    if (role === "ADMIN" || role === "STAFF") {
      next();
    } else {
      return res.status(401).json(crs.ADM401JWT());
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(crs.ERR500JWT(error));
  }
};

module.exports = { verifyJwtMiddleware, verifyStaff };
