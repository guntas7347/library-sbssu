import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained handler to fetch the complete details for a single issued book record.
 */
export const fetchIssueDetailsHandler = async (req, res) => {
  try {
    // The 'id' is validated by the Zod middleware
    const { id: circulationId } = req.validatedQuery;

    // 1. Fetch the complete record and its relations in one query.
    // CHANGE: Switched from `issuedBook` to `circulation` model.
    const circulation = await prisma.circulation.findUnique({
      where: { id: circulationId },
      select: {
        id: true,
        issueRefNumber: true,
        issueDate: true,
        dueDate: true,
        returnDate: true, // Include to check if it has been returned
        issuedBy: { select: { fullName: true } },
        bookAccession: {
          select: {
            accessionNumber: true,
            category: true,
            timesIssued: true,
            book: { select: { id: true, title: true, author: true } },
          },
        },
        libraryCard: {
          select: {
            cardNumber: true,
            member: {
              select: {
                id: true,
                fullName: true,
                photo: true,
                program: true,
              },
            },
          },
        },
      },
    });

    // 2. If no record is found, or if the record has a return date, it's not an "active" issue.
    if (!circulation || circulation.returnDate) {
      return res
        .status(404)
        .json(crs("No active issue record found with that ID."));
    }

    // 3. Transform the nested data into a clean object for the frontend.
    // CHANGE: Mapped from `circulation` object instead of `issue`.
    const issueDetails = {
      id: circulation.id,
      issueRefNumber: circulation.issueRefNumber,
      issueDate: circulation.issueDate.toISOString(),
      dueDate: circulation.dueDate.toISOString(),
      issuedBy: circulation.issuedBy?.fullName ?? "N/A",
      book: {
        id: circulation.bookAccession?.book?.id,
        title: circulation.bookAccession?.book?.title,
        author: circulation.bookAccession?.book?.author,
        category: circulation.bookAccession?.category,
        accessionNumber: circulation.bookAccession?.accessionNumber,
        timesIssued: circulation.bookAccession?.timesIssued,
      },
      member: {
        id: circulation.libraryCard?.member?.id,
        fullName: circulation.libraryCard?.member?.fullName,
        photo: circulation.libraryCard?.member?.photo,
        program: circulation.libraryCard?.member?.program,
        cardNumber: circulation.libraryCard?.cardNumber,
      },
    };

    return res.status(200).json(crs.ISSUE_200_BOOK_FETCHED(issueDetails));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
