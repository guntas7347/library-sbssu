import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { fetchSettings } from "../../controllers/settings.controller.js";

export const findIssuedBooksHandler = async (req, res) => {
  try {
    // Data is validated and typed by the Zod middleware
    const { filter, value, page, limit } = req.validatedQuery;
    const skip = (page - 1) * limit;
    const now = new Date();

    // Build the 'where' clause for the Prisma query using a switch statement
    // CHANGE: The base condition is that a `returnDate` must be null.
    let where = {
      returnDate: null,
    };

    switch (filter) {
      case "irn":
        if (value) {
          where.issueRefNumber = { contains: value, mode: "insensitive" };
        }
        break;
      case "due":
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
        // No additional filters are applied for 'all' or other cases
        break;
    }

    // Fetch the total count and the paginated data in a single transaction
    // CHANGE: Switched from `issuedBook` to `circulation` model.
    const [totalCount, circulations] = await prisma.$transaction([
      prisma.circulation.count({ where }),
      prisma.circulation.findMany({
        where,
        take: limit,
        skip,
        select: {
          id: true,
          issueRefNumber: true,
          issueDate: true,
          dueDate: true,
          bookAccession: {
            select: {
              accessionNumber: true,
              timesIssued: true,
              book: { select: { title: true, author: true } },
            },
          },
          libraryCard: {
            select: {
              cardNumber: true,
              member: {
                select: {
                  fullName: true,
                  membershipId: true,
                  photo: true,
                  memberType: true,
                },
              },
            },
          },
        },
        orderBy: { issueDate: "desc" },
      }),
    ]);

    if (totalCount === 0) {
      return res
        .status(404)
        .json(crs("No issued books found matching your criteria."));
    }

    // Fetch fine rates once to avoid multiple DB calls
    const fineSettings = await fetchSettings("FINE-PER-DAY");
    const fineRates = fineSettings?.value || {};

    // Enhance the data with calculated fields like fines and overdue status
    // CHANGE: Mapped over `circulations` instead of `issuedBooks`.
    const enhancedData = circulations.map((item) => {
      const isOverdue = item.dueDate < now;
      const daysOverdue = isOverdue
        ? Math.floor((now - item.dueDate) / (1000 * 60 * 60 * 24))
        : 0;

      const memberType = item.libraryCard.member.memberType;
      const FINE_PER_DAY = fineRates[memberType] || 0;
      const fineAmount = isOverdue ? daysOverdue * FINE_PER_DAY : 0;

      return {
        id: item.id,
        issueRefNumber: item.issueRefNumber,
        bookTitle: item.bookAccession.book.title,
        bookAuthor: item.bookAccession.book.author,
        accessionNumber: item.bookAccession.accessionNumber,
        memberName: item.libraryCard.member.fullName,
        membershipId: item.libraryCard.member.membershipId,
        photo: item.libraryCard.member.photo,
        issueDate: item.issueDate.toISOString(),
        dueDate: item.dueDate.toISOString(),
        status: isOverdue ? "overdue" : "active",
        daysOverdue,
        fineAmount,
        timesIssued: item.bookAccession.timesIssued || 0,
      };
    });

    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json(
      crs.ISSUE_200_ALL_FETCHED({
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
