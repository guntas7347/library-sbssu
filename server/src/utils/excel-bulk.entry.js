const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const {
  createBook,
  addBookAccessionToBook,
  findBooks,
} = require("../models/books/books.controllers");
const { books1Sorted } = require("../../books1-sorted");
const {
  createBookAccession,
} = require("../models/book-accessions/book-accessions.controllers");
const { default: mongoose } = require("mongoose");
const result = [];

async function readExcelFile(filePath) {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);

    const headerRow = worksheet.getRow(1).values;

    worksheet.eachRow({ includeEmpty: true, firstRow: 2 }, (row, rowNumber) => {
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        const header = headerRow[colNumber];
        rowData[header] = cell.value ? cell.value : null;
      });
      result.push(rowData);
    });
    fs.writeFileSync("books1.json", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error reading Excel file:", error.message);
  }
}

const mergeAccessionNumbers = async () => {
  var title = "";
  let AccessionNumber = [];
  let isNew = true;
  let result = [];
  let prevBook = {};
  books1.forEach((book) => {
    if (title === book.title) {
      AccessionNumber.push(book.accessionNumber);
      prevBook = book;
    } else {
      if (isNew) {
        prevBook = book;
        AccessionNumber.push(book.accessionNumber);
        title = book.title;
        isNew = false;
      } else {
        result.push({ ...prevBook, accessionNumber: AccessionNumber });
        AccessionNumber = [];
        AccessionNumber.push(book.accessionNumber);
        prevBook = book;
        isNew = true;
      }
    }
  });
  // fs.writeFileSync("books1-sorted.json", JSON.stringify(result, null, 2));
};

// readExcelFile(path.join(__dirname, "books1.xlsx"));

const bulkBookEntry = async () => {
  books1Sorted.forEach(async (book) => {
    try {
      await createBook(book);
    } catch (error) {
      console.log(error);
    }
  });
};

// bulkBookEntry();

const bulkAccessionEntry = async () => {
  try {
    books1Sorted.forEach(async (book) => {
      const booksArray = await findBooks({
        sortSelect: "title",
        sortValue: book.title,
      });

      if (booksArray.length == 0) return;
      const bookId = booksArray[0]._id;

      const { accessionNumbers } = book;
      accessionNumbers.forEach(async (accessionNumber) => {
        await createBookAccession({
          bookId,
          accessionNumber,
        }).then(async (bookAccessionDoc) => {
          await addBookAccessionToBook(bookId, bookAccessionDoc[0]._id);
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
// bulkAccessionEntry();

const booksBulkEntry = async () => {
  try {
    let createBookErrors = 0;
    let createBookAccessionErrors = 0;

    for (const book of books1Sorted) {
      try {
        const { accessionNumbers } = book;
        delete book.accessionNumbers;
        const bookDoc = await createBook(book);

        for (const accessionNumber of accessionNumbers) {
          const session = await mongoose.startSession();
          try {
            await session.withTransaction(async () => {
              const bookAccession = await createBookAccession({
                bookId: bookDoc[0]._id,
                accessionNumber,
              });
              await addBookAccessionToBook(
                bookDoc[0]._id,
                bookAccession[0]._id
              );
            });
            await session.commitTransaction();
          } catch (error) {
            if (session.inTransaction()) await session.abortTransaction();
            console.log("Error at adding book accession");
            console.log(error);
            createBookAccessionErrors++;
          } finally {
            session.endSession();
          }
        }
      } catch (error) {
        console.log("Error at Creating Book");
        console.log(book);
        console.log(error);
        createBookErrors++;
      }
    }
    console.log("Operation Compleated");
    console.log("createBookErrors: " + createBookErrors);
    console.log("createBookAccessionErrors: " + createBookAccessionErrors);
  } catch (error) {
    console.log("Operation Failed");
    console.log(error);
  }
};
// booksBulkEntry();

module.exports = { bulkBookEntry };
