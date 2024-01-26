const { Auth_Applicant } = require("../auth.schema");
const { createPasswordHash } = require("../functions");

const createApplicantAuth = async (userCredentials, otp) => {
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
  //   ({
  //   userName: displayName,
  //   email: email,
  //   password: await createPasswordHash(password),
  //   otp,
  //   createdAt: new Date(),
  // });
};

const getApplicantAuthIdByEmail = async (email) => {
  return await Auth_Applicant.findOne({ email });
};

const getApplicantAuthIdById = async (id) => {
  return await Auth_Applicant.findById(id);
};

const getApplicantAuthOtpById = async (id) => {
  return await Auth_Applicant.findById(id).select("otp createdAt");
};

const markApplicantAuthAsVerified = async (id) => {
  /// If OTP value is 111111, then it means that the applicant is verified
  return await Auth_Applicant.findByIdAndUpdate(id, { otp: 111111 });
};

const deleteApplicantAuth = async (id, session) => {
  return await Auth_Applicant.findByIdAndDelete(id, { session });
};

module.exports = {
  createApplicantAuth,
  getApplicantAuthOtpById,
  getApplicantAuthIdByEmail,
  markApplicantAuthAsVerified,
  getApplicantAuthIdById,
  deleteApplicantAuth,
};
