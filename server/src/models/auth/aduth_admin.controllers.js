const Auth = require("./auth.schema");
const { createPasswordHash } = require("./functions");

const createAuthAdmin = async (credentials, session) => {
  const { password } = credentials;
  return await Auth.create(
    [{ ...credentials, password: await createPasswordHash(password) }],
    { session }
  );
};

const getAuthAdminById = async (_id, select) => {
  return await Auth.findById(_id).select(select);
};

const updateAuthAdminById = async (_id, update) => {
  return await Auth.findByIdAndUpdate(_id, update);
};

const getAuthAdmin = async (filter) => {
  return await Auth.findOne(filter);
};

const updateAuthAdmin = async (filter, update, session) => {
  return await Auth.findOneAndUpdate(filter, update, { session });
};

module.exports = {
  createAuthAdmin,
  getAuthAdminById,
  updateAuthAdminById,
  getAuthAdmin,
  updateAuthAdmin,
};
