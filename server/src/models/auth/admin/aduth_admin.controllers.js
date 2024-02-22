const { Auth_Admin } = require("../auth.schema");
const { createPasswordHash } = require("../functions");

const createAuthAdmin = async (credentials) => {
  const { password } = credentials;
  return await Auth_Admin.create({
    ...credentials,
    password: await createPasswordHash(password),
  });
};

const getAuthAdminByEmail = async (email, select) => {
  return await Auth_Admin.findOne({ email }).select(select);
};

const getAuthAdminById = async (_id, select) => {
  return await Auth_Admin.findById(_id).select(select);
};

const updateAuthAdminById = async (_id, update) => {
  return await Auth_Admin.findByIdAndUpdate(_id, update);
};

module.exports = {
  createAuthAdmin,
  getAuthAdminByEmail,
  getAuthAdminById,
  updateAuthAdminById,
};
