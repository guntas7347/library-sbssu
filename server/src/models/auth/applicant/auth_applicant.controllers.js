const { uuidGenerator } = require("../../../utils/functions");
const { AUTH_APPLICANT } = require("../auth.schema");
const { createPasswordHash } = require("../functions");

const createAuthApplicant = async (userCredentials) => {
  const { displayName, email } = userCredentials;
  return await AUTH_APPLICANT.create({
    userName: displayName,
    email,
    password: await createPasswordHash(uuidGenerator()),
  });
};

const getAuthApplicantByEmail = async (email) => {
  return await AUTH_APPLICANT.findOne({ email });
};

const getAuthApplicantById = async (_id) => {
  return await AUTH_APPLICANT.findById(_id);
};

const updateAuthApplicantById = async (_id, update) => {
  return await AUTH_APPLICANT.findByIdAndUpdate(_id, update);
};

const deleteAuthApplicantById = async (_id, session) => {
  return await AUTH_APPLICANT.findByIdAndDelete(_id, { session });
};

const getAuthApplicant = async (filter) => {
  return await AUTH_APPLICANT.findOne(filter);
};

const updateAuthApplicant = async (filter, update) => {
  return await AUTH_APPLICANT.findOneAndUpdate(filter, update);
};

module.exports = {
  createAuthApplicant,
  getAuthApplicantById,
  getAuthApplicantByEmail,
  getAuthApplicant,
  updateAuthApplicantById,
  deleteAuthApplicantById,
  updateAuthApplicant,
};
