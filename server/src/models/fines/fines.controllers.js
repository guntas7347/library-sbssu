const finesSchema = require("./fines.schema");

const createFine = async (fineDetails, session) => {
  return await finesSchema.create([fineDetails], { session });
};

const findFines = async (filter = {}, populate = false) => {
  const { sortSelect, sortValue } = filter;

  const query = finesSchema.find();

  if (populate) {
    query.populate({ path: "studentId", select: "fullName rollNumber" });
  }

  return await query.exec();
};

const getFineById = async (_id, populate = false) => {
  const query = finesSchema.findById(_id);
  if (populate) {
    query.populate({ path: "studentId" }).populate({ path: "returnedBookId" });
  }
  return await query.exec();
};

const updateFineById = async (_id, update) => {
  return await finesSchema.findByIdAndUpdate(_id, update);
};

module.exports = { createFine, findFines, getFineById, updateFineById };
