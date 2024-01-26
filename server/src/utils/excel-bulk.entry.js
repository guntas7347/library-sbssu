const path = require("path");
const fs = require("fs");

const ExcelJS = require("exceljs");
const {
  addNewBook,
  addBookAccessionToBook,
} = require("../models/books/books.controllers");
const { books1 } = require("../../books1");
const { books1Sorted } = require("../../books1-sorted");
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
        rowData[header] = cell.value;
      });
      result.push(rowData);
    });
    fs.writeFileSync("books1.json", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error reading Excel file:", error.message);
  }
}

// readExcelFile(path.join(__dirname, "books1.xlsx"));

const bulkBookEntry = async () => {
  books1Sorted.forEach(async (book) => {
    await addNewBook(book);
  });
};

// bulkBookEntry();

const bulkAccessionEntry = async () => {
  books1Sorted.forEach(async (book) => {
    const booksArray = await fetchAllBooks({
      sortSelect: "title",
      sortValue: book.title,
    });

    if (booksArray == null) return;
    const bookId = booksArray[0]._id;
    const { accessionNumber } = book;
    accessionNumber.forEach(async (aNum) => {
      await addBookAccession({ bookId, accessionNumber: aNum }).then(
        async (bookAccessionDoc) => {
          await addBookAccessionToBook(bookId, bookAccessionDoc._id);
        }
      );
    });
  });
};
// bulkAccessionEntry();
