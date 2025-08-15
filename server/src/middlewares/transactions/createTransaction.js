import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained handler for creating a new transaction and updating a member's balance.
 */
export const createTransactionHandler = async (req, res) => {
  try {
    const {
      memberId,
      amount,
      transactionType,
      category,
      paymentMethod,
      receiptNumber,
      remark,
    } = req.body;
    const authId = req.user.uid;

    // 1. Find the staff ID associated with the authenticated user
    const staff = await prisma.staff.findFirst({
      where: { authId },
      select: { id: true },
    });

    if (!staff?.id) {
      return res
        .status(403)
        .json(crs("Authenticated user is not a valid staff member."));
    }

    // 2. Perform the balance update and transaction creation atomically
    const transaction = await prisma.$transaction(async (tx) => {
      // a. Fetch the member's current balance, locking the row for this transaction
      const member = await tx.member.findUnique({
        where: { id: memberId },
        select: { balance: true },
      });

      if (!member) {
        throw new Error("MemberNotFound"); // Custom error to be caught below
      }

      // b. Calculate the new balance
      const currentBalance = member.balance;
      const newBalance =
        transactionType === "DEBIT"
          ? currentBalance - amount // Debit decreases balance
          : currentBalance + amount; // Credit increases balance

      // c. Update the member's balance
      await tx.member.update({
        where: { id: memberId },
        data: { balance: newBalance },
      });

      // d. Create the transaction record with the correct closing balance
      return tx.transaction.create({
        data: {
          memberId,
          transactionType,
          category,
          amount: amount,
          closingBalance: newBalance,
          paymentMethod,
          receiptNumber,
          issuedById: staff.id,
          remark,
        },
      });
    });
    const transactionEmail = {
      email: transaction,
      fullName: transaction.fullName,
      transactionType: transaction.transactionType,
      amount: transaction.amount / 100,
      balance: transaction.closingBalance / 100,
      category: transaction.category,
      date: new Date(transaction.createdAt).toLocaleDateString(),
    };
    console.log(transaction);

    return res.status(201).json(crs.TRANSACTION_201_CREATED(transaction));
  } catch (error) {
    createLog(error);
    if (error.message === "MemberNotFound") {
      return res
        .status(404)
        .json(crs("The member for this transaction could not be found."));
    }
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
