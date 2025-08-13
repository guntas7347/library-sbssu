import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches a book's details by its accession number for the issuance process.
 */
export const fetchBookForIssueHandler = async (req, res) => {
  try {
    const { number: accessionNumber } = req.validatedQuery;

    const accession = await prisma.accession.findUnique({
      where: { accessionNumber },
      select: {
        accessionNumber: true,
        category: true,
        status: true,
        book: {
          select: {
            title: true,
            author: true,
            location: true,
            accessions: {
              select: { status: true },
            },
          },
        },
      },
    });

    if (!accession || !accession.book) {
      return res
        .status(404)
        .json(crs("No book found with that accession number."));
    }

    // Calculate derived fields
    const totalCopies = accession.book.accessions.length;
    const availableCount = accession.book.accessions.filter(
      (a) => a.status === "available"
    ).length;

    const payload = {
      accessionNumber: accession.accessionNumber,
      category: accession.category ?? "Unknown",
      status: accession.status,
      book: {
        title: accession.book.title ?? "Untitled",
        author: accession.book.author ?? "Unknown Author",
        location: accession.book.location ?? "Unknown Location",
      },
      totalCopies,
      availableCount,
    };

    return res.status(200).json(crs.ISSUE_200_BOOK_FETCHED(payload));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
