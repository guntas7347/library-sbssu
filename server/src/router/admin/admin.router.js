const express = require("express");
const { memberRoute } = require("./member/member.router.admin");
const { booksRouter } = require("./books/books.router.admin");
const { staffRouter } = require("./staff/staff.router.admin");
// const { databaseRouter } = require("./database/database.router.admin");
const { finesRouter } = require("./fines/fines.router.admin");
const crs = require("../../utils/custom-response-codes");
const { searchMembers } = require("../../models/member/member.controllers");
const { searchBooks } = require("../../models/books/books.controllers");
const {
  searchAccessions,
} = require("../../models/book-accessions/book-accessions.controllers");

const adminRouter = express.Router();

adminRouter.post("/search", async (req, res) => {
  try {
    // const modalsAndTypes = [
    //   {
    //     modal: MEMBER,
    //   },
    // ];
    const members = await searchMembers(req.query);
    const books = await searchBooks(req.query);
    const accessions = await searchAccessions(req.query);

    return res.status(200).json(crs.SRH200GLB({ members, books, accessions }));
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

adminRouter.use("/students", memberRoute);
adminRouter.use("/books", booksRouter);
adminRouter.use("/staff", staffRouter);
// adminRouter.use("/database", databaseRouter);
adminRouter.use("/fines", finesRouter);

module.exports = { adminRouter };
