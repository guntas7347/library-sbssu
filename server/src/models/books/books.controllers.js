const {
  getBookIdFromAccessionNumber,
} = require("../book-accessions/book-accessions.controllers");

const booksMongo = require("./books.schema");

const addNewBook = async (bookDetails, session) => {
  try {
    return await booksMongo.create([bookDetails], { session });
  } catch (error) {
    throw Error;
  }
};

const fetchBookDetailsById = async (id) => {
  const query = booksMongo.findById(id);
  query.populate({ path: "accessionNumbers" });
  return await query.exec();
};

const fetchAllBooks = async (
  filter = { sortSelect: "", sortValue: "" },
  select
) => {
  const { sortSelect, sortValue } = filter;

  const query = booksMongo.find().limit(100);
  switch (sortSelect) {
    case "ISBN":
      query.where({ ISBN: sortValue });
      break;

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

    case "title":
      query.where({ title: sortValue });
      break;

    case "_id":
      query.where({ _id: sortValue });
      break;

    default:
      break;
  }
  query.select(select);
  query.populate({ path: "accessionNumbers", select: "accessionNumber -_id" });

  return await query.exec();
};

const countTotalBooks = async () => {
  return await booksMongo.countDocuments();
};

const fetchBookByISBN = async (isbn, populate = false) => {
  const query = booksMongo.findOne({ isbn });

  if (populate) query.populate("bookAccessions");

  return await query.exec();
};

const fetchBookById = async (id) => {
  return await booksMongo.findById(id);
};

const addBookAccessionToBook = async (bookId, bookAccessionId) => {
  return await booksMongo.updateOne(
    { _id: bookId },
    { $push: { accessionNumbers: bookAccessionId } }
  );
};

module.exports = {
  addNewBook,
  fetchAllBooks,
  countTotalBooks,
  fetchBookByISBN,
  fetchBookById,
  addBookAccessionToBook,
  fetchBookDetailsById,
};
