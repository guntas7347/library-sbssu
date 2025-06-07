import bcryptjs from "bcryptjs";
import { createLog } from "./funtions";

export const createPasswordHash = async (password: string) => {
  return new Promise((resolve, reject) => {
    bcryptjs.hash(password, 10, (error, hash) => {
      if (error) {
        createLog(error);
        reject(error);
      } else {
        resolve(hash);
      }
    });
  });
};

export const checkPassword = async (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    bcryptjs
      .compare(password, hash)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => reject(error));
  });
};
