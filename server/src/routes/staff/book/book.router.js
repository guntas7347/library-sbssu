import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth.middlewares.js";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";
import prisma from "../../../services/prisma.js";
import { checkAccessionsAvailability, createBook } from "./book.middlewares.js";
import validateRequest from "../../../middlewares/validate-request.js";
import { BookSchema } from "../../../schema/book.schema.js";
import { fetchBookProfile } from "../../../controllers/book/fetchBookProfile.js";
import { findBooks } from "../../../controllers/book/findBooks.js";

const bookRouter = Router();

bookRouter.post(
  "/create",
  authorisationLevel(["create-book"]),
  validateRequest(BookSchema),
  checkAccessionsAvailability,
  createBook,
  async (req, res) => {
    try {
      return res.status(200).json(crs.BOOK_201_CREATED());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); //create

bookRouter.get(
  "/all",
  authorisationLevel(["search-books"]),
  async (req, res) => {
    try {
      const books = await findBooks(req.query);
      return res.status(200).json(crs.BOOK_200_ALL_FETCHED(books));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); //fetch-all-members

bookRouter.get("/one", authorisationLevel(["view-book"]), async (req, res) => {
  try {
    const bookDoc = await fetchBookProfile(req.query.id);
    if (!bookDoc) return res.status(404).json(crs.BOOK_204_NOT_FOUND());
    return res.status(200).json(crs.BOOK_200_FETCHED(bookDoc));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

bookRouter.get("/search", async (req, res) => {
  try {
    const accessionNumber = +req.query.number;

    const book = await prisma.accession.findUnique({
      where: { accessionNumber },
      include: { book: true },
    });

    return res.status(200).json(crs.MEMBER_200_ALL_FETCHED(book));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

export default bookRouter;
