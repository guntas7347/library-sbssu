const finesSchema = require("./fines.schema");

const createFine = async (fineDetails, session) => {
  return await finesSchema.create([fineDetails], { session });
};

const getFines = async (queryParam) => {
  const { filter, filterValue, page = 1 } = queryParam;
  let totalPages = 1;
  const pageSize = 25;
  const skip = (page - 1) * pageSize;

  const query = finesSchema.find();

  switch (filter) {
    case "rollNumber":
      break;

    default:
      break;
  }

  query.skip(skip).limit(pageSize);
  query.populate({ path: "memberId", select: "fullName rollNumber" });

  return { finesArray: await query.exec(), totalPages };
};

const getFineById = async (_id, populate = false) => {
  const query = finesSchema.findById(_id);
  if (populate) {
    query.populate({ path: "memberId" }).populate({ path: "returnedBookId" });
  }
  return await query.exec();
};

const updateFineById = async (_id, update) => {
  return await finesSchema.findByIdAndUpdate(_id, update);
};

module.exports = { createFine, getFines, getFineById, updateFineById };
