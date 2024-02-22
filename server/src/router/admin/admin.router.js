const express = require("express");
const { studentsRoute } = require("./students/students.router.admin");
const { booksRouter } = require("./books/books.router.admin");
const { staffRouter } = require("./staff/staff.router.admin");
const { databaseRouter } = require("./database/database.router.admin");
const { finesRouter } = require("./fines/fines.router.admin");

const adminRouter = express.Router();

adminRouter.use("/students", studentsRoute);
adminRouter.use("/books", booksRouter);
adminRouter.use("/staff", staffRouter);
adminRouter.use("/database", databaseRouter);
adminRouter.use("/fines", finesRouter);

module.exports = { adminRouter };
