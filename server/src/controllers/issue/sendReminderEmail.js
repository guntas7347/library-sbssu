import prisma from "../../services/prisma.js";
import { emailService } from "../../services/emailService.js"; // Adjust path as needed

/**
 * Fetches details for an issued book and sends an overdue reminder email.
 * @param {string} issuedBookId - The ID of the issued book record.
 * @returns {Promise<boolean>} True if the email was sent successfully.
 * @throws {Error} If the book is not found or is not overdue.
 */
export const sendReminderEmailForIssue = async (issuedBookId) => {
  // 1. Fetch the necessary details for the email.
  const issuedBook = await prisma.issuedBook.findUnique({
    where: { id: issuedBookId },
    select: {
      dueDate: true,
      bookAccession: {
        select: {
          book: {
            select: {
              title: true,
              author: true,
            },
          },
        },
      },
      libraryCard: {
        select: {
          member: {
            select: {
              fullName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!issuedBook) {
    throw new Error("Issued book record not found.");
  }

  // 2. Check if the book is actually overdue.
  const now = new Date();
  const dueDate = new Date(issuedBook.dueDate);

  if (dueDate >= now) {
    throw new Error("This book is not overdue yet. A reminder cannot be sent.");
  }

  const daysOverdue = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));

  // 3. Prepare the data payload for the email service.
  const emailDetails = {
    name: issuedBook.libraryCard.member.fullName,
    email: issuedBook.libraryCard.member.email,
    title: issuedBook.bookAccession.book.title,
    author: issuedBook.bookAccession.book.author,
    dueDate: issuedBook.dueDate,
    daysOverdue: daysOverdue,
  };

  // 4. Call the email service to send the reminder.
  const emailSent = await emailService.sendOverdueReminderEmail(
    emailDetails.email,
    emailDetails
  );

  if (!emailSent) {
    throw new Error("The email provider failed to send the reminder.");
  }

  return true;
};
