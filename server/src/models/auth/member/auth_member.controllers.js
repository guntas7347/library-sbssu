const { AUTH_MEMBER } = require("../auth.schema");

const createAuthMember = async (authMemberDetails, session) => {
  return await AUTH_MEMBER.create([authMemberDetails], { session });
};

const getAuthMember = async (filter) => {
  return await AUTH_MEMBER.findOne(filter);
};

const updateAuthMember = async (filter, update) => {
  return await AUTH_MEMBER.findOneAndUpdate(filter, update);
};

module.exports = {
  createAuthMember,
  getAuthMember,
  updateAuthMember,
};
