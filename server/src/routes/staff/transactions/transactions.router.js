import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.js";
import { findTransactionsHandler } from "../../../middlewares/transactions/findTransactions.js";
import validate from "../../../middlewares/validateRequest.js";
import { findTransactionsSchema } from "../../../schema/transactions/findTransactionsSchema.js";
import { authorisationLevel } from "../../../middlewares/auth/auth.middlewares.js";
import idSchema from "../../../schema/common/idSchema.js";
import { fetchTransactionDetailsHandler } from "../../../middlewares/transactions/fetchTransactionDetails.js";
import { createTransactionHandler } from "../../../middlewares/transactions/createTransaction.js";
import { createTransactionSchema } from "../../../schema/transactions/createTransactionSchema.js";

const transactionsRouter = Router();

transactionsRouter.get(
  "/all",
  authorisationLevel(["view_transactions"]),
  validate(findTransactionsSchema),
  findTransactionsHandler
);

transactionsRouter.get(
  "/one",
  authorisationLevel(["view_transactions"]),
  validate(idSchema),
  fetchTransactionDetailsHandler
);

transactionsRouter.post(
  "/create",
  authorisationLevel(["create_transactions"]),
  validateRequest(createTransactionSchema),
  createTransactionHandler
);

export default transactionsRouter;
