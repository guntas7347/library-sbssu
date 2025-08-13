import prisma from "../../services/prisma.js";
import { emailService } from "../../services/emailService.js"; // Adjust path as needed
import { createLog } from "../../utils/log.js"; // Adjust path as needed

// Helper function to create a delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches all books due tomorrow and sends reminder emails sequentially.
 * @returns {Promise<{successCount: number, failureCount: number, total: number, message?: string}>} A summary of the operation.
 */
export const sendBulkOverdueReminders = async () => {
  // 1. Calculate the exact start and end of "tomorrow".
  const now = new Date();
  const tomorrowStart = new Date(now);
  tomorrowStart.setDate(now.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrowStart);
  tomorrowEnd.setHours(23, 59, 59, 999); // 2. Find all issued books that are due within the "tomorrow" window.

  const booksDueTomorrow = await prisma.issuedBook.findMany({
    where: {
      dueDate: {
        gte: tomorrowStart,
        lte: tomorrowEnd,
      },
    },
    select: {
      dueDate: true,
      bookAccession: {
        select: { book: { select: { title: true, author: true } } },
      },
      libraryCard: {
        select: { member: { select: { fullName: true, email: true } } },
      },
    },
  });

  if (booksDueTomorrow.length === 0) {
    return {
      successCount: 0,
      failureCount: 0,
      total: 0,
      message: "No books due tomorrow.",
    };
  } // 3. Process emails one by one with a safe delay.

  let successCount = 0;
  let failureCount = 0;

  for (const book of booksDueTomorrow) {
    try {
      const emailDetails = {
        name: book.libraryCard.member.fullName,
        email: book.libraryCard.member.email,
        title: book.bookAccession.book.title,
        author: book.bookAccession.book.author,
        dueDate: book.dueDate,
      };

      const sent = await emailService.sendOverdueReminderEmail(
        emailDetails.email,
        emailDetails
      );

      if (sent) successCount++;
      else failureCount++;
      // Wait for 200ms to respect email provider rate limits.

      await sleep(200);
    } catch (error) {
      failureCount++;
      createLog(error);
    }
  } // 4. Return a summary of the operation.

  return { successCount, failureCount, total: booksDueTomorrow.length };
};
