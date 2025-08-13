import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained handler to fetch a paginated list of all transactions.
 */
export const findTransactionsHandler = async (req, res) => {
  try {
    // 1. Get validated data from the query
    const { filter, value, page, limit } = req.validatedQuery;
    const skip = (page - 1) * limit;

    // 2. Build the 'where' clause for the Prisma query
    let where = {};
    switch (filter) {
      case "member":
        if (value) {
          where.OR = [
            { member: { fullName: { contains: value, mode: "insensitive" } } },
            {
              member: {
                membershipId: { contains: value, mode: "insensitive" },
              },
            },
          ];
        }
        break;
      case "receipt":
        if (value) {
          where.receiptNumber = { contains: value, mode: "insensitive" };
        }
        break;
      case "irn":
        if (value) {
          where.returnedBook = {
            issueRefNumber: { contains: value, mode: "insensitive" },
          };
        }
        break;
      case "due":
        where.category = "book_overdue";
        break;
      case "acc":
        if (value) {
          const accessionNum = parseInt(value, 10);
          if (!isNaN(accessionNum)) {
            where.returnedBook = {
              bookAccession: { accessionNumber: accessionNum },
            };
          }
        }
        break;
      case "card":
        if (value) {
          where.returnedBook = {
            libraryCard: {
              cardNumber: { contains: value, mode: "insensitive" },
            },
          };
        }
        break;
      case "amount":
        if (value) {
          const amountNum = parseFloat(value);
          if (!isNaN(amountNum)) {
            where.amount = { equals: amountNum };
          }
        }
        break;
      default:
        // No additional filters for 'all'
        break;
    }

    // 3. Fetch count and data in a single transaction
    const [totalCount, transactions] = await prisma.$transaction([
      prisma.transaction.count({ where }),
      prisma.transaction.findMany({
        where,
        take: limit,
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
              gender: true,
            },
          },
          issuedBy: { select: { fullName: true } },
          returnedBook: {
            select: {
              bookAccession: { select: { book: { select: { title: true } } } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // 4. Handle case where no transactions are found
    if (totalCount === 0) {
      return res
        .status(404)
        .json(crs("No transactions found matching your criteria."));
    }

    // 5. Format the data for the frontend
    const formattedData = transactions.map((t) => {
      const closingBalance = t.closingBalance;
      const previousBalance =
        t.transactionType === "DEBIT"
          ? closingBalance - t.amount
          : closingBalance + t.amount;

      return {
        id: t.id,
        memberName: t.member?.fullName,
        memberPhoto: t.member?.photo,
        membershipId: t.member?.membershipId,
        memberGender: t.member?.gender,
        amount: t.amount,
        transactionType: t.transactionType,
        transactionDate: t.createdAt.toISOString(),
        receiptNumber: t.receiptNumber,
        category: t.category,
        bookTitle: t.returnedBook?.bookAccession?.book?.title,
        closingBalance,
        previousBalance,
        processedBy: t.issuedBy?.fullName,
      };
    });

    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json(
      crs.TRANSACTION_200_ALL_FETCHED({
        data: formattedData,
        totalPages,
        currentPage: page,
        totalCount,
      })
    );
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
