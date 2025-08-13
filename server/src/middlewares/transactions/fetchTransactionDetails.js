import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained handler to fetch comprehensive details for a single transaction.
 */
export const fetchTransactionDetailsHandler = async (req, res) => {
  try {
    // 1. Get the validated transaction ID from the query
    const { id: transactionId } = req.query;

    // 2. Fetch the transaction and all its related data in a single, optimized query.
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        member: true, // Include the full member object
        issuedBy: { select: { fullName: true } },
        // Include the related returned book and its nested relations
        returnedBook: {
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

    // 3. Fetch the member's transaction history separately.
    const history = await prisma.transaction.findMany({
      where: { memberId: transaction.memberId },
      select: {
        id: true,
        transactionType: true,
        category: true,
        createdAt: true,
        issuedBy: { select: { fullName: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // 4. Format the final data structure for the frontend.
    const formattedData = {
      transaction: {
        id: transaction.id,
        receiptNumber: transaction.receiptNumber,
        transactionType: transaction.transactionType,
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        createdAt: transaction.createdAt.toISOString(),
        amount: transaction.amount,
        closingBalance: transaction.closingBalance,
        issuedBy: transaction.issuedBy?.fullName ?? "System",
        remark: transaction.remark,
      },
      member: {
        id: transaction.member.id,
        fullName: transaction.member.fullName,
        photo: transaction.member.photo,
        membershipId: transaction.member.membershipId,
        program: transaction.member.program,
      },
      book: transaction.returnedBook
        ? {
            id: transaction.returnedBook.id,
            title: transaction.returnedBook.bookAccession.book.title,
            author: transaction.returnedBook.bookAccession.book.author,
            accessionNumber:
              transaction.returnedBook.bookAccession.accessionNumber,
          }
        : null,
      history: history.map((h) => ({
        id: h.id,
        transactionType: h.transactionType,
        category: h.category,
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
