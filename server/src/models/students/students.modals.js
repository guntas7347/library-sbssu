const studentsMongo = require("./students.mongo");

const createNewStudent = async (StudentDetails) => {
  return await studentsMongo.create(StudentDetails);
};

const fetchAllStudents = async () => {
  return await studentsMongo.find();
};

const fetchStudentByRollNumber = async (rollNumber) => {
  return await studentsMongo.findOne({ rollNumber: rollNumber });
};

module.exports = {
  createNewStudent,
  fetchAllStudents,
  fetchStudentByRollNumber,
};
