const { AUTH_ADMIN } = require("../auth.schema");
const { createPasswordHash } = require("../functions");

const createAuthAdmin = async (credentials) => {
  const { password } = credentials;
  return await AUTH_ADMIN.create({
    ...credentials,
    password: await createPasswordHash(password),
  });
};

const getAuthAdminById = async (_id, select) => {
  return await AUTH_ADMIN.findById(_id).select(select);
};

const updateAuthAdminById = async (_id, update) => {
  return await AUTH_ADMIN.findByIdAndUpdate(_id, update);
};

const getAuthAdmin = async (filter) => {
  return await AUTH_ADMIN.findOne(filter);
};

const updateAuthAdmin = async (filter, update) => {
  return await AUTH_ADMIN.findOneAndUpdate(filter, update);
};

module.exports = {
  createAuthAdmin,
  getAuthAdminById,
  updateAuthAdminById,
  getAuthAdmin,
  updateAuthAdmin,
};
