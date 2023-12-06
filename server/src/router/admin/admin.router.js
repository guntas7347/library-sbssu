const express = require("express");
const { studentsRoute } = require("./students/students.router.admin");
const { booksRouter } = require("./books/books.router.admin");

const adminRouter = express.Router();

adminRouter.use("/students", studentsRoute);
adminRouter.use("/books", booksRouter);

module.exports = { adminRouter };
