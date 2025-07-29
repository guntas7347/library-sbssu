import prisma from "../../services/prisma.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches the complete details for a single returned book record.
 *
 * @param {string} returnId - The ID of the ReturnedBook record.
 * @returns {Promise<object|false>} The formatted return details object, or false if not found.
 */
export const fetchReturnDetails = async (returnId) => {
  try {
    // 1. Fetch the complete ReturnedBook record and its relations.
    const returnedBook = await prisma.returnedBook.findUnique({
      where: { id: returnId },
      select: {
        id: true,
        issueRefNumber: true,
        issueDate: true,
        dueDate: true,
        returnDate: true,
        issueRemark: true,
        returnRemark: true,
        issuedBy: {
          select: {
            fullName: true,
          },
        },
        returnedBy: {
          select: {
            fullName: true,
          },
        },
        bookAccession: {
          select: {
            accessionNumber: true,
            category: true,
            timesIssued: true,
            book: {
              select: {
                id: true,
                title: true,
                author: true,
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
              },
            },
          },
        },
        fine: {
          select: {
            amount: true,
            paymentMethod: true,
            createdAt: true,
          },
        },
      },
    });

    // 2. If no record is found, return false.
    if (!returnedBook) {
      return false;
    }

    // 3. Transform the nested data into a clean object for the frontend.
    const returnDetails = {
      id: returnedBook.id,
      issueRefNumber: returnedBook.issueRefNumber,
      issueDate: returnedBook.issueDate.toISOString(),
      dueDate: returnedBook.dueDate.toISOString(),
      returnDate: returnedBook.returnDate.toISOString(),
      issuedBy: returnedBook.issuedBy?.fullName ?? "N/A",
      returnedBy: returnedBook.returnedBy?.fullName ?? "N/A",
      remarks: {
        issue: returnedBook.issueRemark,
        return: returnedBook.returnRemark,
      },
      book: {
        id: returnedBook.bookAccession?.book?.id,
        title: returnedBook.bookAccession?.book?.title,
        author: returnedBook.bookAccession?.book?.author,
        category: returnedBook.bookAccession?.category,
        accessionNumber: returnedBook.bookAccession?.accessionNumber,
        timesIssued: returnedBook.bookAccession?.timesIssued,
      },
      member: {
        id: returnedBook.libraryCard?.member?.id,
        fullName: returnedBook.libraryCard?.member?.fullName,
        photo: returnedBook.libraryCard?.member?.photo,
        program: returnedBook.libraryCard?.member?.program,
        cardNumber: returnedBook.libraryCard?.cardNumber,
      },
      fine: {
        amount: returnedBook.fine?.amount ?? 0,
        paidOn: returnedBook.fine?.createdAt?.toISOString() ?? null,
        paymentMethod: returnedBook.fine?.paymentMethod ?? "N/A",
      },
    };

    return returnDetails;
  } catch (error) {
    createLog(error, "Failed to fetch return details");
    throw error;
  }
};
