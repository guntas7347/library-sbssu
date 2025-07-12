import crypto from "crypto";
import { createLog } from "./log.js";

export const encryptText = (text) => {
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

export const decrptText = (payload) => {
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
