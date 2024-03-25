const { formatString } = require("../../utils/functions");
const studentsCol = require("./students.schema");

const createStudent = async (StudentDetails, session) => {
  return await studentsCol.create([StudentDetails], { session });
};

const findStudents = async (filter, select) => {
  const { sortSelect, sortValue } = filter;

  const query = studentsCol.find();

  switch (sortSelect) {
    case "fetchAllStudents":
      break;

    default:
      query.where({ [sortSelect]: sortValue });
      break;
  }
  query.select(select);
  return await query.exec();
};

const getStudentByRollNumber = async (rollNumber, populate = false, select) => {
  const query = studentsCol.findOne({ rollNumber });

  if (populate) query.populate({ path: "libraryCards", select });

  return await query.exec();
};

const getStudentById = async (_id, populate = false, selectLibraryCard) => {
  const query = studentsCol.findById(_id);
  if (populate)
    query.populate({ path: "libraryCards", select: selectLibraryCard });

  return await query.exec();
};

const addLibraryCardToStudent = async (_id, libraryCardId, session) => {
  return await studentsCol.findByIdAndUpdate(
    _id,
    {
      $push: { libraryCards: libraryCardId },
    },
    { session }
  );
};

const countStudentDocs = async (filter) =>
  await studentsCol.countDocuments(filter);

const updateStudentById = async (_id, updatedDoc) => {
  return await studentsCol.findByIdAndUpdate(_id, updatedDoc);
};

module.exports = {
  createStudent,
  findStudents,
  getStudentByRollNumber,
  getStudentById,
  addLibraryCardToStudent,
  countStudentDocs,
  updateStudentById,
};
