const libraryCards = require("./library-cards.schema");

const createLibraryCard = async (libraryCardDetails) => {
  return await libraryCards.create(libraryCardDetails);
};

const fetchLibraryCardsByStudentId = async (studentId) => {
  return await libraryCards.find({ studentId: studentId });
};

const fetchLibraryCardByCardNumber = async (
  cardNumber,
  populate = false,
  select
) => {
  const query = libraryCards.findOne({ cardNumber });

  if (populate) {
    query.populate({ path: "studentId", select });
  }

  return await query.exec();
};

const fetchLibraryCardById = async (id) => {
  return await libraryCards.findById(id);
};

const updateLibraryCardStatus = async (_id, status, session) => {
  return await libraryCards.findByIdAndUpdate(_id, { status }, { session });
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
