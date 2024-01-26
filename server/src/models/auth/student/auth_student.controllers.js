const { Auth_Student } = require("../auth.schema");

const createStudentAuth = async (data, session) => {
  return await Auth_Student.create([data], { session });
};

const findStudentAuth = async (email) => {
  return await Auth_Student.findOne({ email }).select("email password");
};

module.exports = { createStudentAuth, findStudentAuth };
