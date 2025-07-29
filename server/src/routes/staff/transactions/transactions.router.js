import { Router } from "express";
import { createLog } from "../../../utils/log.js";
import crs from "../../../utils/crs/crs.js";
import { findTransactions } from "../../../controllers/transaction/findTransactions.js";
import { fetchTransactionDetails } from "../../../controllers/transaction/fetchTransactionDetails.js";
import validateRequest from "../../../middlewares/validate-request.js";
import { CreateTransactionSchema } from "../../../schema/transaction.schema.js";
import { createTransaction } from "../../../controllers/transaction/createTransaction.js";
import prisma from "../../../services/prisma.js";

const transactionsRouter = Router();

transactionsRouter.get("/all", async (req, res) => {
  try {
    const transactions = await findTransactions(req.query);
    if (!transactions) return res.status(404).json(crs.DATA_204_NOT_FOUND());
    return res.status(200).json(crs.TRANSACTION_200_ALL_FETCHED(transactions));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

transactionsRouter.get("/one", async (req, res) => {
  try {
    const transactions = await fetchTransactionDetails(req.query.id);
    if (!transactions) return res.status(404).json(crs.DATA_204_NOT_FOUND());
    return res.status(200).json(crs.TRANSACTION_200_ALL_FETCHED(transactions));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

transactionsRouter.post(
  "/create",
  validateRequest(CreateTransactionSchema),
  async (req, res) => {
    try {
      let transaction = null;
      await prisma.$transaction(async (tx) => {
        const staff = await tx.auth.findUnique({
          where: { id: req.user.uid },
          select: { staff: { select: { id: true } } },
        });
        transaction = await createTransaction(
          { ...req.vBody, issuedById: staff.staff.id },
          tx
        );
      });
      if (!transaction) throw Error();

      return res.status(200).json(crs.TRANSACTION_201_CREATED(transaction));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); // create

export default transactionsRouter;
