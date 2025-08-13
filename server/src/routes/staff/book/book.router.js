import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth/auth.middlewares.js";
import { createBookHandler } from "../../../middlewares/book/createBook.js";
import { BookSchema } from "../../../schema/book/BookSchema.js";
import { fetchBookProfileHandler } from "../../../middlewares/book/fetchBookProfile.js";
import { findBooksHandler } from "../../../middlewares/book/findBooks.js";
import validate from "../../../middlewares/validateRequest.js";
import { findBooksSchema } from "../../../schema/book/findBooksSchema.js";
import { updateBookSchema } from "../../../schema/book/updateBookSchema.js";
import { updateBookHandler } from "../../../middlewares/book/updateBook.js";
import idSchema from "../../../schema/common/idSchema.js";

const bookRouter = Router();

bookRouter.post(
  "/create",
  authorisationLevel(["create-book"]),
  validate(BookSchema),
  createBookHandler
);

bookRouter.post(
  "/update",
  authorisationLevel(["edit-book"]),
  validate(updateBookSchema),
  updateBookHandler
);

bookRouter.get(
  "/all",
  authorisationLevel(["view_books"]),
  validate(findBooksSchema),
  findBooksHandler
);

bookRouter.get(
  "/one",
  authorisationLevel(["view_books"]),
  validate(idSchema),
  fetchBookProfileHandler
);

export default bookRouter;
