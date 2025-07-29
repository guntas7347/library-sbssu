import prisma from "../../services/prisma.js";

/**
 * Fetches comprehensive details for a single transaction, including the associated
 * member, book (if applicable), and the member's entire transaction history.
 *
 * @param {string} transactionId - The unique ID of the transaction to fetch.
 * @returns {Promise<object|false>} A structured object with transaction, member, book, and history data, or false if the transaction is not found.
 */

export const fetchTransactionDetails = async (transactionId) => {
  try {
    // 1. Fetch the primary transaction and its member in one go.
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        member: true, // Include the full member object
        issuedBy: { select: { fullName: true } }, // Get the staff member's name
      },
    });

    // If the transaction doesn't exist, return false.
    if (!transaction) {
      return false;
    }

    let bookData = null;
    // 2. If the transaction is a book fine, fetch the related book details.
    if (transaction.returnedBookId) {
      const returnedBook = await prisma.returnedBook.findUnique({
        where: { id: transaction.returnedBookId },
        select: {
          bookAccession: {
            select: {
              accessionNumber: true,
              book: {
                select: {
                  title: true,
                  author: true,
                },
              },
            },
          },
        },
      });

      if (returnedBook) {
        bookData = {
          id: transaction.returnedBookId,
          title: returnedBook.bookAccession.book.title,
          author: returnedBook.bookAccession.book.author,
          accessionNumber: returnedBook.bookAccession.accessionNumber,
        };
      }
    }

    // 3. Fetch the complete transaction history for the associated member.
    const history = await prisma.transaction.findMany({
      where: { memberId: transaction.memberId },
      select: {
        id: true,
        transactionType: true,
        category: true,
        createdAt: true,
        issuedBy: { select: { fullName: true } }, // Get staff name for each history entry
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20, // Limit to the last 20 transactions for performance
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
      book: bookData, // This will be null if not applicable
      history: history.map((h) => ({
        id: h.id,
        transactionType: h.transactionType,
        category: h.category,
        createdAt: h.createdAt.toISOString(),
        staff: h.issuedBy?.fullName ?? "System",
      })),
    };

    return formattedData;
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    throw error;
  }
};
