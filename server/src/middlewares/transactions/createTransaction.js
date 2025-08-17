import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { emailService } from "../../services/emailService.js";

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
    const { transaction, memberDetails } = await prisma.$transaction(
      async (tx) => {
        // a. Fetch the member's current balance and details, locking the row
        const member = await tx.member.findUnique({
          where: { id: memberId },
          select: { balance: true, email: true, fullName: true },
        });

        if (!member) {
          throw new Error("MemberNotFound"); // Custom error to be caught below
        }

        // b. Calculate the new balance
        // CORRECTED: Restored original logic.
        // DEBIT (fine/charge) decreases the balance.
        // CREDIT (payment) increases the balance.
        const currentBalance = member.balance;
        const newBalance =
          transactionType === "DEBIT"
            ? currentBalance - amount
            : currentBalance + amount;

        // c. Update the member's balance
        await tx.member.update({
          where: { id: memberId },
          data: { balance: newBalance },
        });

        // d. Create the transaction record (without closingBalance)
        const newTransaction = await tx.transaction.create({
          data: {
            memberId,
            transactionType,
            category,
            amount: amount,
            paymentMethod,
            receiptNumber,
            issuedById: staff.id,
            remark,
          },
        });

        return {
          transaction: newTransaction,
          memberDetails: { ...member, newBalance },
        };
      }
    );

    // 3. Send transaction confirmation email (non-blocking)
    const transactionEmail = {
      email: memberDetails.email,
      fullName: memberDetails.fullName,
      transactionType: transaction.transactionType,
      amount: transaction.amount / 100, // Convert from cents for display
      balance: memberDetails.newBalance / 100, // Use the calculated new balance
      category: transaction.category,
      date: new Date(transaction.createdAt).toLocaleDateString(),
    };

    emailService.sendTransactionConfirmationEmail(
      transactionEmail.email,
      transactionEmail
    );

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
