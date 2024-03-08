const bookAccessionsSchema = require("./book-accessions.schema");

const createBookAccession = async (bookAccessionDetails, session) => {
  return await bookAccessionsSchema.create([bookAccessionDetails], { session });
};

const getBookAccessionById = async (_id) => {
  return await bookAccessionsSchema.findById(_id);
};

const getBookAccessionByAccessionNumber = async (
  accessionNumber,
  populate = false,
  select
) => {
  const query = bookAccessionsSchema.findOne({ accessionNumber });
  if (populate) query.populate({ path: "bookId", select });
  return await query.exec();
};

const updateBookAccession = async (bookAccessionId, update, session) => {
  return await bookAccessionsSchema.updateOne(
    { _id: bookAccessionId },
    update,
    { session }
  );
};

const countBookAccessionDocs = async () =>
  await bookAccessionsSchema.countDocuments();

module.exports = {
  createBookAccession,
  getBookAccessionById,
  getBookAccessionByAccessionNumber,
  updateBookAccession,
  countBookAccessionDocs,
};
