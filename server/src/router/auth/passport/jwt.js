const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret";

const createJWT = (token = {}, expiry = 60 * 60) => {
  return jwt.sign(token, JWT_SECRET, { expiresIn: expiry });
};

const verifyJwt = (token) => {
  return jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
      return null;
    } else {
      return decoded;
    }
  });
};

module.exports = { createJWT, verifyJwt };
