const libraryCards = require("./library-cards.schema");

const createLibraryCard = async (libraryCardDetails) => {
  return await libraryCards.create(libraryCardDetails);
};

const fetchLibraryCardsByStudentId = async (studentId) => {
  return await libraryCards.find({ studentId: studentId });
};

const fetchLibraryCardByCardNumber = async (cardNumber) => {
  return await libraryCards.findOne({ cardNumber });
};

const fetchLibraryCardById = async (id) => {
  return await libraryCards.findById(id);
};

const updateLibraryCardStatus = async (_id, status) => {
  return await libraryCards.findByIdAndUpdate(_id, { status });
};

const fetchLibraryCardIdByCardNumber = async (cardNumber) => {
  return await libraryCards.findOne({ cardNumber }).select("_id");
};
module.exports = {
  createLibraryCard,
  fetchLibraryCardsByStudentId,
  fetchLibraryCardByCardNumber,
  fetchLibraryCardById,
  updateLibraryCardStatus,
  fetchLibraryCardIdByCardNumber,
};
