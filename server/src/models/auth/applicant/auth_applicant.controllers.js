const { Auth_Applicant } = require("../auth.schema");
const { createPasswordHash } = require("../functions");

const createAuthApplicant = async (userCredentials, otp) => {
  const { displayName, email, password } = userCredentials;
  return await Auth_Applicant.findOneAndUpdate(
    {
      email,
    },
    {
      userName: displayName,
      email: email,
      password: await createPasswordHash(password),
      otp,
      createdAt: new Date(),
    },
    { upsert: true }
  );
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

module.exports = {
  createAuthApplicant,
  getAuthApplicantById,
  getAuthApplicantByEmail,
  updateAuthApplicantById,
  deleteAuthApplicantById,
};
