import bcrypt from "bcryptjs";
import { createLog } from "./functions.js";

export const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        createLog(error);
        reject(error);
      } else {
        resolve(hash);
      }
    });
  });
};

export const comparePassword = async (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, hash)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => reject(error));
  });
};
