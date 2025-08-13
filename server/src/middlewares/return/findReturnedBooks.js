import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

export const findReturnedBooksHandler = async (req, res) => {
  try {
    // 1. Get validated data from the query
    const { filter, value, page, limit } = req.validatedQuery;
    const skip = (page - 1) * limit;
    const now = new Date();

    // 2. Build the 'where' clause for the Prisma query
    let where = {};
    switch (filter) {
      case "irn": // <-- Added
        if (value) {
          where.issueRefNumber = { contains: value, mode: "insensitive" };
        }
        break;
      case "due": // <-- Added
        // This finds returned books whose due date was before the current time.
        where.dueDate = { lt: now };
        break;
      case "acc":
        if (value) {
          const accessionNum = parseInt(value, 10);
          if (!isNaN(accessionNum)) {
            where.bookAccession = { accessionNumber: accessionNum };
          }
        }
        break;
      case "card":
        if (value) {
          where.libraryCard = {
            cardNumber: { contains: value, mode: "insensitive" },
          };
        }
        break;
      default:
        // No additional filters for 'all'
        break;
    }

    // 3. Fetch count and data in a single transaction
    const [totalCount, returnedBooks] = await prisma.$transaction([
      prisma.returnedBook.count({ where }),
      prisma.returnedBook.findMany({
        where,
        take: limit,
        skip,
        select: {
          id: true,
          returnDate: true,
          issueDate: true,
          dueDate: true,
          returnRemark: true,
          fine: { select: { amount: true } },
          bookAccession: {
            select: {
              accessionNumber: true,
              book: { select: { title: true, author: true } },
            },
          },
          libraryCard: {
            select: {
              member: {
                select: {
                  fullName: true,
                  membershipId: true,
                  photo: true,
                },
              },
            },
          },
        },
        orderBy: { returnDate: "desc" },
      }),
    ]);

    // 4. Handle case where no books are found
    if (totalCount === 0) {
      return res
        .status(404)
        .json(crs("No returned books found matching your criteria."));
    }

    // 5. Enhance data with calculated fields
    const enhancedData = returnedBooks.map((item) => {
      const returnDate = new Date(item.returnDate);
      const issueDate = new Date(item.issueDate);
      const dueDate = new Date(item.dueDate);
      const borrowDuration = Math.ceil(
        (returnDate - issueDate) / (1000 * 60 * 60 * 24)
      );
      const isLate = returnDate > dueDate;

      return {
        id: item.id,
        bookTitle: item.bookAccession.book.title,
        bookAuthor: item.bookAccession.book.author,
        accessionNumber: item.bookAccession.accessionNumber,
        memberName: item.libraryCard.member.fullName,
        membershipId: item.libraryCard.member.membershipId,
        photo: item.libraryCard.member.photo,
        returnDate: returnDate.toLocaleDateString(),
        borrowDuration,
        isLate,
        condition: item.returnRemark || "Unknown",
        fine: item.fine?.amount || 0,
      };
    });

    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json(
      crs.RETURN_200_FETCHED({
        data: enhancedData,
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
