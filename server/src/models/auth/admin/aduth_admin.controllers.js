const { Auth_Admin } = require("../auth.schema");
const { createPasswordHash } = require("../functions");

const getAdminDoc = async (email) => {
  return await Auth_Admin.findOne({ email }).select("email password");
};

const createAdminAccount = async (credentials) => {
  const { email, password } = credentials;
  return await Auth_Admin.create({
    userName: email,
    email,
    password: await createPasswordHash(password),
    role: "ADMIN",
    createdAt: new Date(),
  });
};

module.exports = { createAdminAccount, getAdminDoc };
