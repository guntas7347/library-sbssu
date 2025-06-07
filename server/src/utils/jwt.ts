import jwt, { JwtPayload } from "jsonwebtoken";
import crypto from "crypto";
import { createLog } from "./funtions";

export interface TokenPayload extends JwtPayload {
  [key: string]: any;
}

export const createJWT = (
  token: TokenPayload = {},
  expiry = 60 * 60
): string => {
  return jwt.sign(token, process.env.JWT_SECRET as string, {
    expiresIn: expiry,
  }) as string;
};

export const verifyJwt = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
  } catch (error) {
    createLog(error);
    return null;
  }
};

export const encrypt = (text: string): string | undefined => {
  try {
    const key = Buffer.from(process.env.CRYPTO_ENCRYPTION_KEY as string, "hex");
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
  } catch (error) {
    createLog(error);
    return undefined;
  }
};

export const decrpt = (payload: string): string | null => {
  try {
    const decodedPayload = decodeURIComponent(payload);
    const [ivHex, authTagHex, encryptedHex] = decodedPayload.split(":");

    const key = Buffer.from(process.env.CRYPTO_ENCRYPTION_KEY as string, "hex");
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

const secretKeysGenerator = () => {
  interface SecretKeys {
    jwtSecretKey: string;
    encryptionKey: string;
  }

  console.log("\nGenerating secret keys...\n");

  // Generate a random 256-bit (32-byte) secret key for JWT signing (HS256)
  const jwtSecretKey: string = crypto.randomBytes(32).toString("hex");
  console.log("JWT_SECRET_KEY=", jwtSecretKey);

  // Generate a random 256-bit (32-byte) key for AES-256 encryption
  const encryptionKey: string = crypto.randomBytes(32).toString("hex");
  console.log("CRYPTO_ENCRYPTION_KEY=", encryptionKey);

  return { jwtSecretKey, encryptionKey } as SecretKeys;
};
