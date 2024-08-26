const { uuidGenerator } = require("../../../utils/functions");
const { Auth_Applicant } = require("../auth.schema");
const { createPasswordHash } = require("../functions");

const createAuthApplicant = async (userCredentials) => {
  const { displayName, email } = userCredentials;
  return await Auth_Applicant.create({
    userName: displayName,
    email,
    password: await createPasswordHash(uuidGenerator()),
  });
};

const getAuthApplicantByEmail = async (email) => {
  return await Auth_Applicant.findOne({ email });
};

const getAuthApplicantById = async (_id) => {
  return await Auth_Applicant.findById(_id);
};

const updateAuthApplicantById = async (_id, update) => {
  return await Auth_Applicant.findByIdAndUpdate(_id, update);
};

const deleteAuthApplicantById = async (_id, session) => {
  return await Auth_Applicant.findByIdAndDelete(_id, { session });
};

const getAuthApplicant = async (filter) => {
  return await Auth_Applicant.findOne(filter);
};

const updateAuthApplicant = async (filter, update) => {
  return await Auth_Applicant.findOneAndUpdate(filter, update);
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
