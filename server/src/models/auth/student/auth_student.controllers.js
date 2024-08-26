const { Auth_Student } = require("../auth.schema");

const createAuthStudent = async (data, session) => {
  return await Auth_Student.create([{ ...data, role: "STUDENT" }], { session });
};

const getAuthStudentByEmail = async (email) => {
  return await Auth_Student.findOne({ email });
};

const getAuthStudentById = async (_id) => {
  return await Auth_Student.findById(_id);
};

const updateAuthStudentById = async (_id, update) => {
  return await Auth_Student.findByIdAndUpdate(_id, update);
};

const getAuthStudent = async (filter) => {
  return await Auth_Student.findOne(filter);
};

const updateAuthStudent = async (filter, update) => {
  return await Auth_Student.findOneAndUpdate(filter, update);
};

module.exports = {
  createAuthStudent,
  getAuthStudentByEmail,
  getAuthStudentById,
  updateAuthStudentById,
  getAuthStudent,
  updateAuthStudent,
};
