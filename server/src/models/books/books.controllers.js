const {
  getBookIdFromAccessionNumber,
} = require("../book-accessions/book-accessions.controllers");

const booksMongo = require("./books.schema");

const createBook = async (bookDetails, session) => {
  try {
    return await booksMongo.create([bookDetails], { session });
  } catch (error) {
    throw Error;
  }
};

const getBookById = async (id, populate = false) => {
  const query = booksMongo.findById(id);
  if (populate) query.populate({ path: "accessionNumbers" });
  return await query.exec();
};

const findBooks = async (
  filter = { sortSelect: "", sortValue: "" },
  select,
  limit = 100,
  populate = false,
  select_accession
) => {
  const { sortSelect, sortValue } = filter;
  const query = booksMongo.find().limit(limit);
  switch (sortSelect) {
    case "accessionNumber":
      const accessionNumber = await getBookIdFromAccessionNumber(sortValue);
      if (accessionNumber != null) {
        query.where({
          _id: accessionNumber.bookId,
        });
      } else {
        query.where({
          _id: null,
        });
      }
      break;

    case "isbn":
      query.where({ isbn: sortValue });
      break;

    case "title":
      query.where({ title: sortValue });
      break;

    default:
      break;
  }
  query.select(select);

  populate
    ? query.populate({
        path: "accessionNumbers",
        select: select_accession,
      })
    : "";

  return await query.exec();
};

const countTotalBooks = async () => {
  return await booksMongo.countDocuments();
};

const getBookByIsbn = async (isbn, select, populate = false) => {
  const query = booksMongo.findOne({ isbn });
  query.select(select);
  if (populate) query.populate({ path: "bookAccessions" });

  return await query.exec();
};

const addBookAccessionToBook = async (bookId, bookAccessionId, session) => {
  return await booksMongo.findByIdAndUpdate(
    bookId,
    { $push: { accessionNumbers: bookAccessionId } },
    { session }
  );
};

const updateBookById = async (_id, bookDoc) => {
  return await booksMongo.findByIdAndUpdate(_id, bookDoc);
};

module.exports = {
  createBook,
  findBooks,
  countTotalBooks,
  getBookById,
  getBookByIsbn,
  addBookAccessionToBook,
  updateBookById,
};
