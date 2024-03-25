const crs = require("../../utils/custom-response-codes");
const { checkPassword } = require("../../models/auth/functions");
const { createJWT, encryptText } = require("./jwt");

const TOKEN_EXPIRY_MINUTES = 60;

const verifyPassword = async (req, res, next) => {
  try {
    const { password, hash } = req.cust;
    const result = await checkPassword(password, hash);
    if (!result) return res.status(401).json(crs.AUTH401VPASS());
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
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
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};
module.exports = { verifyPassword, setJwtCookie };
