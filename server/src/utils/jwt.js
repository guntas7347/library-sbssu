import jwt from "jsonwebtoken";

export const createJWT = (token = {}, expiry = 60 * 60) => {
  return jwt.sign(token, process.env.JWT_SECRET, { expiresIn: expiry });
};

export const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return null;
    else return decoded;
  });
};

// const secretKeysGenerator = () => {
//   console.log("\nGenerating secret keys...\n");

//   // Generate a random 256-bit (32-byte) secret key for JWT signing (HS256)
//   const jwtSecretKey = crypto.randomBytes(32).toString("hex"); // 256-bit secret key in hexadecimal format
//   console.log("JWT_SECRET_KEY = ", jwtSecretKey);

//   // Generate a random 256-bit (32-byte) key for AES-256 encryption
//   const encryptionKey = crypto.randomBytes(32).toString("hex"); // 32 bytes = 256 bits
//   console.log("CRYPTO_ENCRYPTION_KEY = ", encryptionKey);
//   }

// secretKeysGenerator();
