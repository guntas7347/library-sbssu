const bcrypt = require("bcryptjs");

const createPasswordHash = async (password) => {
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

const checkPassword = async (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, hash)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => reject(error));
  });
};

module.exports = { createPasswordHash, checkPassword };
//   userName: { type: String, required: true },
