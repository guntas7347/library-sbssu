const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { createLog } = require("../../utils/functions");

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
  try {
    const key = Buffer.from(process.env.CRYPTO_ENCRYPTION_KEY, "hex");
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
  } catch (error) {
    createLog(error);
  }
};

const decrptText = (payload) => {
  try {
    // Decode URI component in case it has %3A etc.
    const decodedPayload = decodeURIComponent(payload);
    // Expecting format: iv:authTag:encryptedText
    const [ivHex, authTagHex, encryptedHex] = decodedPayload.split(":");

    const key = Buffer.from(process.env.CRYPTO_ENCRYPTION_KEY, "hex");
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, undefined, "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } catch (error) {
    createLog(error);
    return null;
  }
};

module.exports = { createJWT, verifyJwt, encryptText, decrptText };

// const secretKeysGenerator = () => {
//   console.log("\nGenerating secret keys...\n");

//   // Generate a random 256-bit (32-byte) secret key for JWT signing (HS256)
//   const jwtSecretKey = crypto.randomBytes(32).toString("hex"); // 256-bit secret key in hexadecimal format
//   console.log("JWT_SECRET_KEY = ", jwtSecretKey);

//   // Generate a random 256-bit (32-byte) key for AES-256 encryption
//   const encryptionKey = crypto.randomBytes(32).toString("hex"); // 32 bytes = 256 bits
//   console.log("CRYPTO_ENCRYPTION_KEY = ", encryptionKey);

// secretKeysGenerator();
