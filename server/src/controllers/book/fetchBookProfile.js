import prisma from "../../services/prisma.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches a complete profile for a single book, including its publication details,
 * copy statuses, and a list of current issues.
 *
 * @param {string} bookId - The ID of the book to fetch.
 * @returns {Promise<object|false>} The formatted book profile object, or false if not found.
 */

export const fetchBookProfile = async (bookId) => {
  try {
    // 1. Fetch the book and all its related copies (accessions) in one query.
    // For each accession, include details about its current issue, if it has one.
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        accessions: {
          include: {
            // We need to get the currently active issue for each accession copy
            issuedBooks: {
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
    if (!book) {
      return false;
    }

    // 2. Process the raw data to create the structure needed by the frontend.

    // A. Calculate copy statistics
    const totalCopies = book.accessions.length;
    const availableCopies = book.accessions.filter(
      (acc) => acc.status === "available"
    ).length;
    const issuedCopies = totalCopies - availableCopies;

    // B. Format the list of current issues
    const currentIssues = book.accessions
      // Filter for accessions that are actually issued and have a corresponding record
      .filter((acc) => acc.status === "issued" && acc.issuedBooks.length > 0)
      .map((acc) => {
        // An accession can only have one active issue at a time
        const issue = acc.issuedBooks[0];
        const isOverdue = new Date(issue.dueDate) < new Date();

        return {
          id: issue.id,
          memberId: issue.libraryCard.member.membershipId,
          memberName: issue.libraryCard.member.fullName,
          issueDate: new Date(issue.issueDate).toDateString(),
          dueDate: new Date(issue.dueDate).toDateString(),
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
      // Pass the accessions to get the total count on the frontend
      accessions: book.accessions,

      // For CurrentIssues
      currentIssues,
    };

    return profileData;
  } catch (error) {
    createLog(error, "Failed to fetch book profile");
    // Re-throw the error to be handled by the route's main error handler
    throw error;
  }
};
