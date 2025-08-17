import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained handler to fetch comprehensive details for a single transaction.
 */
export const fetchTransactionDetailsHandler = async (req, res) => {
  try {
    // 1. Get the validated transaction ID from the query
    const { id: transactionId } = req.validatedQuery;

    // 2. Fetch the transaction and all its related data.
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        member: true,
        issuedBy: { select: { fullName: true } },
        circulation: {
          include: {
            bookAccession: {
              include: {
                book: true,
              },
            },
          },
        },
      },
    });

    if (!transaction) {
      return res.status(404).json(crs("Transaction not found."));
    }

    // 3. Calculate the closing balance AT THE TIME of this transaction.
    const balanceHistory = await prisma.transaction.groupBy({
      by: ["transactionType"],
      _sum: {
        amount: true,
      },
      where: {
        memberId: transaction.memberId,
        createdAt: {
          lte: transaction.createdAt, // Include all transactions up to this one
        },
      },
    });

    const totalDebits =
      balanceHistory.find((t) => t.transactionType === "DEBIT")?._sum.amount ||
      0;
    const totalCredits =
      balanceHistory.find((t) => t.transactionType === "CREDIT")?._sum.amount ||
      0;

    // CORRECTED: The balance is credits minus debits, consistent with your business logic.
    const closingBalanceAtTime = totalCredits - totalDebits;

    // 4. Fetch the member's recent transaction history for context.
    const history = await prisma.transaction.findMany({
      where: { memberId: transaction.memberId },
      select: {
        id: true,
        transactionType: true,
        category: true,
        createdAt: true,
        amount: true,
        issuedBy: { select: { fullName: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // 5. Format the final data structure for the frontend.
    const formattedData = {
      transaction: {
        id: transaction.id,
        receiptNumber: transaction.receiptNumber,
        transactionType: transaction.transactionType,
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        createdAt: transaction.createdAt.toISOString(),
        amount: transaction.amount / 100,
        closingBalance: closingBalanceAtTime / 100,
        issuedBy: transaction.issuedBy?.fullName ?? "System",
        currentBalance: transaction.member.balance / 100,
        remark: transaction.remark,
      },
      member: {
        id: transaction.member.id,
        fullName: transaction.member.fullName,
        photo: transaction.member.photo,
        membershipId: transaction.member.membershipId,
        program: transaction.member.program,
        currentBalance: transaction.member.balance / 100,
      },
      book: transaction.circulation
        ? {
            id: transaction.circulation.id,
            title: transaction.circulation.bookAccession.book.title,
            author: transaction.circulation.bookAccession.book.author,
            accessionNumber:
              transaction.circulation.bookAccession.accessionNumber,
          }
        : null,
      history: history.map((h) => ({
        id: h.id,
        transactionType: h.transactionType,
        category: h.category,
        amount: h.amount / 100,
        createdAt: h.createdAt.toISOString(),
        staff: h.issuedBy?.fullName ?? "System",
      })),
    };

    return res.status(200).json(crs.TRANSACTION_200_ALL_FETCHED(formattedData));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
