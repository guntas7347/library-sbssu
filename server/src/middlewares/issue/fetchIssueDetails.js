import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained handler to fetch the complete details for a single issued book record.
 */
export const fetchIssueDetailsHandler = async (req, res) => {
  try {
    // The 'id' is validated by the Zod middleware
    const { id: issueId } = req.query;

    // 1. Fetch the complete record and its relations in one query.
    const issue = await prisma.issuedBook.findUnique({
      where: { id: issueId },
      select: {
        id: true,
        issueRefNumber: true,
        issueDate: true,
        dueDate: true,
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

    // 2. If no record is found, return a 404.
    if (!issue) {
      return res.status(404).json(crs("No issue record found with that ID."));
    }

    // 3. Transform the nested data into a clean object for the frontend.
    const issueDetails = {
      id: issue.id,
      issueRefNumber: issue.issueRefNumber,
      issueDate: issue.issueDate.toISOString(),
      dueDate: issue.dueDate.toISOString(),
      issuedBy: issue.issuedBy?.fullName ?? "N/A",
      book: {
        id: issue.bookAccession?.book?.id,
        title: issue.bookAccession?.book?.title,
        author: issue.bookAccession?.book?.author,
        category: issue.bookAccession?.category,
        accessionNumber: issue.bookAccession?.accessionNumber,
        timesIssued: issue.bookAccession?.timesIssued,
      },
      member: {
        id: issue.libraryCard?.member?.id,
        fullName: issue.libraryCard?.member?.fullName,
        photo: issue.libraryCard?.member?.photo,
        program: issue.libraryCard?.member?.program,
        cardNumber: issue.libraryCard?.cardNumber,
      },
    };

    return res.status(200).json(crs.ISSUE_200_BOOK_FETCHED(issueDetails));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
