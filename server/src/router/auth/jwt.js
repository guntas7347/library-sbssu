const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createJWT = (token = {}, expiry = 60 * 60) => {
  return jwt.sign(token, process.env.JWT_SECRET, { expiresIn: expiry });
};

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
      return null;
    } else {
      return decoded;
    }
  });
};

const encryptText = (text) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CRYPTO_ENCRYPTION_KEY, "hex"),
    Buffer.from(process.env.CRYPTO_ENCRYPTION_IV, "hex")
  );
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrptText = (text) => {
  try {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.CRYPTO_ENCRYPTION_KEY, "hex"),
      Buffer.from(process.env.CRYPTO_ENCRYPTION_IV, "hex")
    );
    let decrypted = decipher.update(text, "hex", "utf-8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { createJWT, verifyJwt, encryptText, decrptText };
