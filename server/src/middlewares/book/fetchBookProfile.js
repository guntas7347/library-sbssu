import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches a complete profile for a single book, including its publication details,
 * copy statuses, and a list of current issues.
 *
 * @param {import("express").Request} req - The Express request object.
 * @param {import("express").Response} res - The Express response object.
 * @returns {Promise<void>}
 */
export const fetchBookProfileHandler = async (req, res) => {
  try {
    // 1. Fetch the book and its related accessions. For each accession,
    //    include its currently active circulation record (if one exists).
    const book = await prisma.book.findUnique({
      where: { id: req.validatedQuery.id },
      include: {
        accessions: {
          include: {
            // CHANGE: Replaced `issuedBooks` with `circulations`.
            // ADDED: A `where` clause to only fetch circulations that are active (not returned).
            circulations: {
              where: { returnDate: null },
              include: {
                libraryCard: {
                  select: {
                    member: {
                      select: {
                        id: true,
                        fullName: true,
                        membershipId: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // Handle case where no book is found
    if (!book) return res.status(404).json(crs("Book not found"));

    // 2. Process the raw data to create the structure needed by the frontend.

    // A. Calculate copy statistics (this logic remains the same)
    const totalCopies = book.accessions.length;
    const availableCopies = book.accessions.filter(
      (acc) => acc.status === "available"
    ).length;
    const issuedCopies = totalCopies - availableCopies;

    // B. Format the list of current issues
    // CHANGE: Logic now checks for active circulations instead of issuedBooks.
    const currentIssues = book.accessions
      // Filter for accessions that are issued and have an active circulation record.
      .filter((acc) => acc.status === "issued" && acc.circulations.length > 0)
      .map((acc) => {
        // An accession can only have one active circulation at a time.
        const circulation = acc.circulations[0];
        const isOverdue = new Date(circulation.dueDate) < new Date();

        return {
          id: circulation.id,
          memberId: circulation.libraryCard.member.membershipId,
          memberName: circulation.libraryCard.member.fullName,
          issueDate: new Date(circulation.issueDate).toDateString(),
          dueDate: new Date(circulation.dueDate).toDateString(),
          status: isOverdue ? "Overdue" : "Issued",
        };
      });

    // 3. Assemble the final data object for the response.
    const profileData = {
      // For ProfileCard
      title: book.title,
      author: book.author,
      tags: book.tags,
      issuedCopies,
      availableCopies,

      // For BookInformation
      isbn: book.isbn,
      placeAndPublishers: book.placeAndPublishers,
      publicationYear: book.publicationYear,
      edition: book.edition,
      pages: book.pages,
      location: book.location,
      source: book.source,
      cost: book.cost,
      description: book.description,
      accessions: book.accessions,

      // For CurrentIssues
      currentIssues,
    };

    return res.status(200).json(crs.BOOK_200_FETCHED(profileData));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
