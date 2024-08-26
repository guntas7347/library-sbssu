const { formatString } = require("../../utils/functions");
const studentsCol = require("./students.schema");

const createStudent = async (StudentDetails, session) => {
  return await studentsCol.create([StudentDetails], {
    session,
  });
};

const getStudents = async (queryParam) => {
  const { filter, filterValue, page = 1 } = queryParam;
  let totalPages = 1;
  const pageSize = 25;
  const skip = (page - 1) * pageSize;

  const query = studentsCol.find();
  switch (filter) {
    case "fetchAllStudents":
      query.where();
      totalPages = Math.ceil((await countStudentDocs()) / pageSize);
      break;

    default:
      query.where({ [filter]: filterValue });
      break;
  }

  query.skip(skip).limit(pageSize);
  return { studentsArray: await query.exec(), totalPages };
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
  getStudents,
  getStudentByRollNumber,
  getStudentById,
  addLibraryCardToStudent,
  countStudentDocs,
  updateStudentById,
};
