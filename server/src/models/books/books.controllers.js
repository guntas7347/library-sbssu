const Book = require("./books.schema");
const {
  getAccession,
} = require("../book-accessions/book-accessions.controllers");
const Accession = require("../book-accessions/book-accessions.schema");

const createBook = async (bookDetails, session) => {
  try {
    await Book.create([bookDetails], { session });
  } catch (error) {
    throw Error;
  }
};

const getBookById = async (id, populate = false) => {
  const query = Book.findById(id);
  if (populate) query.populate({ path: "accessionNumbers" });
  return await query.exec();
};

const getBooks = async (queryParam) => {
  const { filter, filterValue, page = 1 } = queryParam;
  let skip = (page - 1) * 25;
  let totalPages = 1;
  const query = Book.find().skip(skip).limit(25);

  switch (filter) {
    case "accessionNumber":
      var accessionNumber = await getAccession({
        accessionNumber: filterValue,
      });
      if (accessionNumber)
        query.where({
          _id: accessionNumber.bookId,
        });
      else query.where({ _id: { $exists: false } });
      break;

    case "title":
      query.where({ title: { $regex: filterValue, $options: "i" } });

      totalPages = Math.ceil(
        (await countTotalBooks({
          title: { $regex: filterValue, $options: "i" },
        })) / 25
      );

      // to do, add respective total books counter
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

const countTotalBooks = async (query = {}) => {
  return await Book.countDocuments().where(query);
};

const getBookByIsbn = async (isbn, select, populate = false) => {
  const query = Book.findOne({ isbn });
  query.select(select);
  if (populate) query.populate({ path: "bookAccessions" });

  return await query.exec();
};

const addBookAccessionToBook = async (bookId, bookAccessionId, session) => {
  return await Book.findByIdAndUpdate(
    bookId,
    { $push: { accessionNumbers: bookAccessionId } },
    { session }
  );
};

const updateBookById = async (_id, bookDoc) => {
  return await Book.findByIdAndUpdate(_id, bookDoc);
};

const getBook = async (filter) => await Book.findOne(filter);

const searchBooks = async (param) => {
  const { search } = param;

  const query = Book.find({
    $or: [
      {
        title: { $regex: search, $options: "i" },
      },
    ],
  });

  query.limit(3).select("_id title author");

  return await query.exec();
};

module.exports = {
  createBook,
  getBook,
  getBooks,
  countTotalBooks,
  getBookById,
  getBookByIsbn,
  addBookAccessionToBook,
  updateBookById,
  searchBooks,
};

// async function removeDuplicateAccessions() {
//   try {
//     // Find duplicates in the Accession collection by grouping by accessionNumber
//     const duplicates = await Accession.aggregate([
//       {
//         $group: {
//           _id: "$accessionNumber",
//           count: { $sum: 1 },
//           ids: { $push: "$_id" },
//         },
//       },
//       { $match: { count: { $gt: 1 } } }, // Only find accession numbers with more than 1 occurrence
//     ]);

//     // Now we have a list of duplicates; let's remove them.
//     for (const duplicate of duplicates) {
//       // Remove all duplicates except for the first occurrence
//       const [firstAccession, ...otherAccessions] = duplicate.ids;

//       // Delete all the duplicate accessions
//       await Accession.deleteMany({ _id: { $in: otherAccessions } });
//       console.log(`Removed duplicates for accessionNumber ${duplicate._id}`);

//       // Now update the Book documents to reference the correct (first) accession
//       await Book.updateMany(
//         { accessionNumbers: { $in: otherAccessions } }, // Books that reference the deleted accessions
//         { $set: { "accessionNumbers.$[elem]": firstAccession } }, // Replace with the first accession
//         { arrayFilters: [{ elem: { $in: otherAccessions } }] } // Only update those elements in the array
//       );
//       console.log(
//         `Updated books to reference the correct accessionNumber ${duplicate._id}`
//       );
//     }
//   } catch (error) {
//     console.error("Error removing duplicate accessions:", error);
//   }
// }
