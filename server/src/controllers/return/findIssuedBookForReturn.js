import prisma from "../../services/prisma.js";
import { fetchSettings } from "../settings.controller.js";

/**
 * Fetches the details of a currently issued book by its accession number.
 * This function is optimized to gather all data needed for the return process.
 *
 * @param {number} accessionNumber - The accession number of the book to find.
 * @returns {Promise<object|null>} A formatted object with issue, book, member, and fine details, or null if not found.
 */
export const findIssuedBookForReturn = async (accessionNumber) => {
  try {
    // 1. Find the unique issued book record matching the accession number.
    const issuedBook = await prisma.issuedBook.findFirst({
      where: {
        bookAccession: {
          accessionNumber: +accessionNumber,
        },
      },
      select: {
        id: true,
        issueRefNumber: true,
        issueDate: true,
        dueDate: true,
        issueCondition: true,
        issueRemark: true,
        issuedBy: { select: { fullName: true } },
        bookAccession: {
          select: {
            accessionNumber: true,
            category: true,
            book: {
              select: {
                id: true,
                title: true,
                author: true,
                isbn: true,
                location: true,
              },
            },
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
                membershipId: true,
                memberType: true, // Required for fine calculation
              },
            },
          },
        },
      },
    });

    // 2. If no issued book is found, return null.
    if (!issuedBook) {
      return null;
    }

    // 3. Calculate the overdue fine.
    const now = new Date();
    const fineSettings = await fetchSettings("FINE-PER-DAY");
    const fineRates = fineSettings?.value || {};
    const memberType = issuedBook.libraryCard.member.memberType;
    const FINE_PER_DAY = fineRates[memberType] || 0;

    const isOverdue = issuedBook.dueDate < now;
    const daysOverdue = isOverdue
      ? Math.floor((now - issuedBook.dueDate) / (1000 * 60 * 60 * 24))
      : 0;
    const fineAmount = daysOverdue * FINE_PER_DAY;

    // 4. Format the data into the structure expected by the frontend.
    const returnDetails = {
      issue: {
        id: issuedBook.id,
        issueRefNumber: issuedBook.issueRefNumber,
        issueDate: issuedBook.issueDate.toISOString(),
        dueDate: issuedBook.dueDate.toISOString(),
        issueCondition: issuedBook.issueCondition,
        issueRemark: issuedBook.issueRemark || "None",
        issuedBy: issuedBook.issuedBy?.fullName ?? "N/A",
        daysOverdue: daysOverdue,
      },
      book: {
        id: issuedBook.bookAccession.book.id,
        title: issuedBook.bookAccession.book.title,
        author: issuedBook.bookAccession.book.author,
        accessionNumber: issuedBook.bookAccession.accessionNumber,
        isbn: issuedBook.bookAccession.book.isbn,
        category: issuedBook.bookAccession.category,
        location: issuedBook.bookAccession.book.location,
      },
      member: {
        id: issuedBook.libraryCard.member.id,
        fullName: issuedBook.libraryCard.member.fullName,
        photo: issuedBook.libraryCard.member.photo,
        program: issuedBook.libraryCard.member.program,
        membershipId: issuedBook.libraryCard.member.membershipId,
        cardNumber: issuedBook.libraryCard.cardNumber,
      },
      fine: fineAmount,
    };

    return returnDetails;
  } catch (error) {
    console.error("Error finding issued book for return:", error);
    // Re-throw the error to be handled by the controller.
    throw error;
  }
};
