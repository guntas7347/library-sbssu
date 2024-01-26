const { formatString } = require("../../utils/functions");
const studentsCol = require("./students.schema");

const createNewStudent = async (StudentDetails, session) => {
  return await studentsCol.create(
    [{ ...StudentDetails, createdAt: new Date() }],
    { session }
  );
};

const fetchAllStudents = async (filter, select) => {
  const { sortSelect, sortValue } = filter;
  // const sortValue = formatString(filter.sortValue);

  const query = studentsCol.find();

  switch (sortSelect) {
    case "rollNumber":
      query.where({ rollNumber: sortValue });
      break;

    case "name":
      query.where({ name: sortValue });
      break;

    case "phoneNumber":
      query.where({ phoneNumber: sortValue });
      break;

    default:
      break;
  }
  query.select(select);
  return await query.exec();
};

const fetchStudentByRollNumber = async (rollNumber, populate = false) => {
  const query = studentsCol.findOne({ rollNumber });

  if (populate) query.populate("libraryCards");

  return await query.exec();
};

const fetchStudentById = async (id, populate = false) => {
  const query = studentsCol.findById(id);

  if (populate)
    query.populate({ path: "libraryCards", select: "cardNumber status -_id" });

  return await query.exec();
};

const addLibraryCardToStudent = async (studentId, libraryCardId) => {
  return await studentsCol.updateOne(
    { _id: studentId },
    { $push: { libraryCards: libraryCardId } }
  );
};

module.exports = {
  createNewStudent,
  fetchAllStudents,
  fetchStudentByRollNumber,
  fetchStudentById,
  addLibraryCardToStudent,
};
