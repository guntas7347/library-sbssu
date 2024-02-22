const { Auth_Student } = require("../auth.schema");

const createAuthStudent = async (data, session) => {
  return await Auth_Student.create([data], { session });
};

const getAuthStudentByEmail = async (email) => {
  return await Auth_Student.findOne({ email });
};

const getAuthStudentById = async (_id) => {
  return await Auth_Student.findById(_id);
};

module.exports = {
  createAuthStudent,
  getAuthStudentByEmail,
  getAuthStudentById,
};
