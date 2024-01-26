const bookAccessionsSchema = require("./book-accessions.schema");

const addBookAccession = async (bookAccessionDetails) => {
  return await bookAccessionsSchema.create(bookAccessionDetails);
};

const fetchBookAccessionByAccessionNumber = async (
  accessionNumber,
  populate = false,
  select
) => {
  const query = bookAccessionsSchema.findOne({
    accessionNumber,
  });

  if (populate) query.populate({ path: "bookId", select });

  return await query.exec();
};

const getBookAccessionIdFromBookAccessionNumber = async (accessionNumber) => {
  return await bookAccessionsSchema
    .findOne({ accessionNumber: accessionNumber })
    .select("_id");
};

const updateBookAccessionStatus = async (bookAccessionId, status, session) => {
  return await bookAccessionsSchema.updateOne(
    { _id: bookAccessionId },
    { status },
    { session }
  );
};

const getBookIdFromAccessionNumber = async (accessionNumber) => {
  return await bookAccessionsSchema
    .findOne({ accessionNumber: accessionNumber })
    .select("bookId -_id");
};

module.exports = {
  addBookAccession,
  fetchBookAccessionByAccessionNumber,
  updateBookAccessionStatus,
  getBookAccessionIdFromBookAccessionNumber,
  getBookIdFromAccessionNumber,
};
