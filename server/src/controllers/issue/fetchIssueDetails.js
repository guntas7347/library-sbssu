import prisma from "../../services/prisma.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches the complete details for a single issued book record.
 *
 * @param {string} issueId - The ID of the IssuedBook record.
 * @returns {Promise<object|false>} The formatted issue details object, or false if not found.
 */

export const fetchIssueDetails = async (issueId) => {
  try {
    // 1. Fetch the complete IssuedBook record and its relations in one query.
    const issue = await prisma.issuedBook.findUnique({
      where: { id: issueId },
      select: {
        id: true,
        issueRefNumber: true,
        issueDate: true,
        dueDate: true,
        // Get the staff member who issued the book
        issuedBy: {
          select: {
            fullName: true,
          },
        },
        // Get book details via the accession record
        bookAccession: {
          select: {
            accessionNumber: true,
            category: true,
            timesIssued: true, // Fetch timesIssued as requested
            book: {
              select: {
                id: true, // Book's own ID
                title: true,
                author: true,
              },
            },
          },
        },
        // Get member details via the library card
        libraryCard: {
          select: {
            cardNumber: true,
            member: {
              select: {
                id: true, // Member's own ID
                fullName: true,
                photo: true,
                program: true,
              },
            },
          },
        },
      },
    });

    // 2. If no record is found, return false.
    if (!issue) {
      return false;
    }

    // 3. Transform the nested data into a flat, clean object for the frontend.
    const issueDetails = {
      id: issue.id,
      issueRefNumber: issue.issueRefNumber,
      issueDate: issue.issueDate.toISOString(),
      dueDate: issue.dueDate.toISOString(),
      issuedBy: issue.issuedBy?.fullName ?? "N/A", // Safely access staff name
      // We don't include renewal counts as requested
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

    return issueDetails;
  } catch (error) {
    createLog(error, "Failed to fetch issue details");
    throw error; // Let the route handler manage the final response
  }
};
