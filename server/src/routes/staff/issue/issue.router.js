import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.js";
import { findIssuedBooksHandler } from "../../../middlewares/issue/findIssuedBooks.js";
import { authorisationLevel } from "../../../middlewares/auth/auth.middlewares.js";
import { fetchMemberForIssueHandler } from "../../../middlewares/issue/fetchMemberForIssue.js";
import validate from "../../../middlewares/validateRequest.js";
import { fetchMemberForIssueSchema } from "../../../schema/issue/fetchMemberForIssueSchema.js";
import { fetchBookForIssueSchema } from "../../../schema/issue/fetchBookForIssueSchema.js";
import { fetchBookForIssueHandler } from "../../../middlewares/issue/fetchBookForIssue.js";
import { issueBookHandler } from "../../../middlewares/issue/issueBook.js";
import { findIssuesSchema } from "../../../schema/issue/findIssuesSchema.js";
import { fetchIssueDetailsHandler } from "../../../middlewares/issue/fetchIssueDetails.js";
import idSchema from "../../../schema/common/idSchema.js";
import { issueSchema } from "../../../schema/issue/issueSchema.js";

const issueRouter = Router();

issueRouter.get(
  "/member",
  authorisationLevel(["issue_books"]),
  validate(fetchMemberForIssueSchema),
  fetchMemberForIssueHandler
);

issueRouter.get(
  "/book",
  authorisationLevel(["issue_books"]),
  validate(fetchBookForIssueSchema),
  fetchBookForIssueHandler
);

issueRouter.post(
  "/issue",
  authorisationLevel(["issue_books"]),
  validateRequest(issueSchema),
  issueBookHandler
);

issueRouter.get(
  "/all",
  authorisationLevel(["issue_books"]),
  validate(findIssuesSchema),
  findIssuedBooksHandler
);

issueRouter.get(
  "/one",
  authorisationLevel(["issue_books"]),
  validate(idSchema),
  fetchIssueDetailsHandler
);

export default issueRouter;
