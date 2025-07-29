import prisma from "../../services/prisma.js";

/**
 * Fetches a paginated list of all transactions, formatted for the new architecture.
 *
 * @param {object} queryParam - The query parameters for filtering and pagination.
 * @param {string} [queryParam.name] - The filter type (e.g., 'member', 'receipt').
 * @param {string} [queryParam.value] - The value for the filter.
 * @param {number} [queryParam.page=1] - The page number for pagination.
 * @returns {Promise<{data: object[], totalPages: number}|false>} A structured object with data, or false if not found.
 */
export const findTransactions = async (queryParam) => {
  const { name, value, page = 1 } = queryParam || {};
  const pageSize = 15;
  const skip = (page - 1) * pageSize;

  let where = {};

  if (name && value) {
    switch (name) {
      case "member":
        where.OR = [
          { member: { fullName: { contains: value, mode: "insensitive" } } },
          {
            member: { membershipId: { contains: value, mode: "insensitive" } },
          },
        ];
        break;
      case "receipt":
        where.receiptNumber = { contains: value, mode: "insensitive" };
        break;
    }
  }

  const [totalCount, transactions] = await prisma.$transaction([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
      where,
      take: pageSize,
      skip,
      select: {
        id: true,
        receiptNumber: true,
        createdAt: true,
        amount: true,
        transactionType: true,
        category: true,
        closingBalance: true,
        member: {
          select: {
            fullName: true,
            membershipId: true,
            photo: true,
            gender: true, // Fetch member gender
          },
        },
        issuedBy: {
          select: {
            fullName: true,
          },
        },
        returnedBook: {
          // Fetch related book info if it's a fine
          select: {
            bookAccession: {
              select: { book: { select: { title: true } } },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  if (totalCount === 0) {
    return false;
  }

  // Format the data to match the frontend architecture precisely.
  const formattedData = transactions.map((t) => {
    const amount = t.amount;
    const closingBalance = t.closingBalance;
    // Calculate previous balance based on the transaction type
    const previousBalance =
      t.transactionType === "DEBIT"
        ? closingBalance + amount
        : closingBalance - amount;

    return {
      id: t.id,
      memberName: t.member?.fullName,
      memberPhoto: t.member?.photo,
      membershipId: t.member?.membershipId,
      memberGender: t.member?.gender, // Add gender to the final object
      amount: amount,
      transactionType: t.transactionType,
      transactionDate: t.createdAt.toISOString(),
      receiptNumber: t.receiptNumber,
      category: t.category,
      bookTitle: t.returnedBook?.bookAccession?.book?.title,
      closingBalance: closingBalance,
      previousBalance: previousBalance,
      processedBy: t.issuedBy?.fullName,
    };
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: formattedData,
    totalPages,
  };
};
