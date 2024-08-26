const {
  getAccession,
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

const getBooks = async (queryParam) => {
  const { filter, filterValue, page = 1 } = queryParam;
  let skip = (page - 1) * 25;
  let totalPages = 1;
  const query = booksMongo.find().skip(skip).limit(25);

  switch (filter) {
    case "accessionNumber":
      const accessionNumber = await getAccession({
        accessionNumber: filterValue,
      });
      if (accessionNumber)
        query.where({
          _id: accessionNumber.bookId,
        });
      else query.where({ _id: { $exists: false } });
      break;

    default:
      totalPages = Math.ceil((await countTotalBooks()) / 25);
      break;
  }

  query.populate("accessionNumbers");

  return {
    booksArray: await query.exec(),
    totalPages,
  };
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
  getBooks,
  countTotalBooks,
  getBookById,
  getBookByIsbn,
  addBookAccessionToBook,
  updateBookById,
};
