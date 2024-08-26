const libraryCards = require("./library-cards.schema");

const createLibraryCard = async (libraryCardDetails, session) => {
  return await libraryCards.create([libraryCardDetails], { session });
};

const getLibraryCardsByStudentId = async (studentId) => {
  return await libraryCards.find({ studentId: studentId });
};

const getLibraryCardByCardNumber = async (
  cardNumber,
  populate = false,
  select
) => {
  const query = libraryCards.findOne({ cardNumber });
  if (populate) query.populate({ path: "studentId", select });
  return await query.exec();
};

const getLibraryCardById = async (id) => {
  return await libraryCards.findById(id);
};

const updateLibraryCardById = async (_id, update, session) => {
  return await libraryCards.findByIdAndUpdate(_id, update, { session });
};

const getLibraryCard = async (filter) => {
  return await libraryCards.findOne(filter);
};

module.exports = {
  createLibraryCard,
  getLibraryCardsByStudentId,
  getLibraryCardByCardNumber,
  getLibraryCardById,
  updateLibraryCardById,
  getLibraryCard,
};
