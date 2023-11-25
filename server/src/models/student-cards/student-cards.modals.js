const studentCardsMongo = require("./student-cards.mongo");

const createStudentCard = async (studentCardDetails) => {
  return await studentCardsMongo.create(studentCardDetails);
};

module.exports = { createStudentCard };
