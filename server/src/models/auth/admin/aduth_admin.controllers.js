const { Auth_Admin } = require("../auth.schema");
const { createPasswordHash } = require("../functions");

const getAdminDoc = async (email, select) => {
  return await Auth_Admin.findOne({ email }).select(select);
};

const createAdminAccount = async (credentials) => {
  const { email, password, displayName, role } = credentials;
  return await Auth_Admin.create({
    ...credentials,
    userName: displayName,
    email,
    password: await createPasswordHash(password),
    createdAt: new Date(),
    role,
  });
};

const fetchAdminDocById = async (id, select) => {
  return await Auth_Admin.findById(id).select(select);
};

module.exports = { createAdminAccount, getAdminDoc, fetchAdminDocById };
