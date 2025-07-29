import { createLog } from "../../utils/log.js";

/**
 * Creates a transaction record and updates a member's balance atomically.
 * This function MUST be called from within a `prisma.$transaction()` block
 * by passing the transactional client `tx`.
 *
 * @param {object} payload - The transaction details.
 * @param {string} payload.memberId - The ID of the member.
 * @param {'DEBIT' | 'CREDIT'} payload.transactionType - The type of transaction.
 * @param {number} payload.amount - The transaction amount.
 * @param {string} payload.category - The category of the transaction.
 * @param {string} payload.paymentMethod - The payment method used.
 * @param {string} [payload.receiptNumber] - The optional receipt number.
 * @param {string} [payload.returnedBookId] - The optional ID of the returned book for fines.
 * @param {string} [payload.issuedById] - The optional ID of the staff who issued the transaction.
 * @param {object} tx - The Prisma transactional client.
 * @returns {Promise<object>} The created transaction record.
 */
export const createTransaction = async (payload, tx) => {
  const {
    memberId,
    amount,
    transactionType,
    category,
    paymentMethod,
    receiptNumber,
    returnedBookId,
    issuedById,
    remark,
  } = payload;

  try {
    // 1. Fetch the member's current balance USING THE TRANSACTIONAL CLIENT (tx).
    // This locks the row and prevents race conditions.
    const member = await tx.member.findUnique({
      where: { id: memberId },
      select: { balance: true },
    });

    if (!member) {
      // This will safely abort the entire parent transaction.
      throw new Error(
        `Transaction failed: Member with ID ${memberId} not found.`
      );
    }

    // 2. Calculate the new balance.
    const currentBalance = member.balance;
    const newBalance =
      transactionType === "DEBIT"
        ? currentBalance - Number(amount)
        : currentBalance + Number(amount);

    // 3. Update the member's balance with the newly calculated value.
    await tx.member.update({
      where: { id: memberId },
      data: { balance: newBalance },
    });

    // 4. Create the transaction record with the correct closing balance.
    const transaction = await tx.transaction.create({
      data: {
        memberId,
        transactionType,
        category,
        amount: Number(amount),
        closingBalance: newBalance,
        paymentMethod,
        receiptNumber,
        returnedBookId,
        issuedById,
        remark,
      },
    });

    return transaction;
  } catch (error) {
    createLog(error);
    // Re-throw the error to ensure the parent transaction is rolled back.
    throw error;
  }
};
