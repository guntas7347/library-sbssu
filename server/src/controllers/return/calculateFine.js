import prisma from "../../services/prisma.js";
import { fetchSettings } from "../settings.controller.js";

/**
 * Calculates the overdue fine for a given issued book.
 *
 * @param {string} issuedBookId The unique ID of the issued book to calculate the fine for.
 * @returns {Promise<{fine: number, returnDate: Date}>} An object containing the calculated `fine` and the current `returnDate`.
 * @throws {Error} Throws an error if the issued book is not found or if the fine rate is not configured.
 */
export const calculateFine = async (issuedBookId) => {
  try {
    const issuedBook = await prisma.issuedBook.findUnique({
      where: { id: issuedBookId },
      select: {
        dueDate: true,
        libraryCard: {
          select: {
            member: {
              select: { memberType: true },
            },
          },
        },
      },
    });

    // If the record is not found, it's a critical error because the ID was expected to be valid.
    if (!issuedBook) {
      throw new Error(`Issued book with ID "${issuedBookId}" not found.`);
    }

    // Fetch the fine rates from settings.
    const fineSettings = await fetchSettings("FINE-PER-DAY");
    const fineRates = fineSettings?.value || {};

    // Determine the correct fine rate for the member's type.
    const memberType = issuedBook.libraryCard.member.memberType;
    const FINE_PER_DAY = fineRates[memberType];

    // If a fine rate isn't configured, throw a specific error.
    if (FINE_PER_DAY === undefined || FINE_PER_DAY === null) {
      throw new Error(
        `Fine rate not configured for member type: ${memberType}`
      );
    }

    // Calculate overdue days and the total fine.
    const returnDate = new Date();
    const dueDate = new Date(issuedBook.dueDate);
    let daysOverdue = 0;
    if (returnDate > dueDate) {
      daysOverdue = Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24));
    }
    const totalFine = daysOverdue * FINE_PER_DAY;

    return { fine: totalFine, returnDate };
  } catch (error) {
    console.error("Error in calculateFine:", error.message);
    throw error;
  }
};
