const crs = require("../../utils/custom-response-codes");
const { checkPassword } = require("../../models/auth/functions");
const { createJWT, encryptText } = require("./jwt");
const { createLog } = require("../../utils/functions");

const TOKEN_EXPIRY_MINUTES = 60;

const verifyPassword = async (req, res, next) => {
  try {
    const { password, hash } = req.cust;
    const result = await checkPassword(password, hash);
    if (!result) return res.status(401).json(crs.AUTH401VPASS());
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const setJwtCookie = async (req, res, next) => {
  try {
    const { _id } = req.cust;
    const jwtCredentials = { uid: _id };
    const jwt = createJWT(jwtCredentials);
    const cookieOptions = {
      // secure: true, // only use for production

      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * TOKEN_EXPIRY_MINUTES),
      path: "/",
    };

    res.cookie("session", encryptText(jwt), cookieOptions);

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const authorisationLevel = (rights = ["open"]) => {
  return function (req, res, next) {
    try {
      if (!Array.isArray(rights)) rights = [rights];
      if (
        req.user.rights.some((right) => rights.includes(right)) ||
        req.user.rights.includes("admin") ||
        rights[0] === "open"
      )
        next();
      else return res.status(403).json(crs.ADM403JWT());
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.ERR500JWT(error));
    }
  };
};

module.exports = {
  verifyPassword,
  setJwtCookie,
  authorisationLevel,
};
