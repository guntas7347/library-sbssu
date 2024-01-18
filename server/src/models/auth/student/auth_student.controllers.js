const { Auth_Student } = require("../auth.schema");

const createStudentAuth = async () => {
  return await Auth_Student.create();
};

const findStudentAuth = async (email) => {
  return await Auth_Student.findOne({ email }).select("email password");
};

module.exports = { findStudentAuth };
