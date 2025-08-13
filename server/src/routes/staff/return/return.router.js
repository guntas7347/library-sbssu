import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth/auth.middlewares.js";
import { fetchReturnDetailsHandler } from "../../../middlewares/return/fetchReturnDetails.js";
import { fetchBookForIssueSchema } from "../../../schema/issue/fetchBookForIssueSchema.js";
import validate from "../../../middlewares/validateRequest.js";
import { findReturnedBooksHandler } from "../../../middlewares/return/findReturnedBooks.js";
import { findReturnsSchema } from "../../../schema/return/findReturnsSchema.js";
import { returnBookHandler } from "../../../middlewares/return/returnBook.js";
import { fetchReturnBookDetailsHandler } from "../../../middlewares/return/fetchReturnBookDetails.js";
import idSchema from "../../../schema/common/idSchema.js";
import { returnBookSchema } from "../../../schema/return/returnBookSchema.js";

const returnRouter = Router();

returnRouter.get(
  "/fetch",
  authorisationLevel(["return_books"]),
  validate(fetchBookForIssueSchema),
  fetchReturnDetailsHandler
);

returnRouter.post(
  "/return",
  authorisationLevel(["return_books"]),
  validate(returnBookSchema),
  returnBookHandler
);

returnRouter.get(
  "/all",
  authorisationLevel(["return_books"]),
  validate(findReturnsSchema),
  findReturnedBooksHandler
);

returnRouter.get(
  "/one",
  authorisationLevel(["return_books"]),
  validate(idSchema),
  fetchReturnBookDetailsHandler
);
export default returnRouter;
