const express = require("express");
const { studentsRoute } = require("./admin/students/students.router.admin");
const { booksRouter } = require("./admin/books/books.router.admin");
const { settingsRouter } = require("./admin/settings/settings.router.admin");

const router = express.Router();

router.use("/admin/students", studentsRoute);
router.use("/admin/books", booksRouter);
router.use("/admin/settings", settingsRouter);

module.exports = { router };
