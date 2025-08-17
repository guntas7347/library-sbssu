import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { emailService } from "../../services/emailService.js";

/**
 * A self-contained handler to process a lost book report.
 * This closes the original loan and creates a separate fine for the lost item.
 */
export const reportBookLostHandler = async (req, res) => {
  try {
    const { id: circulationId, returnRemark, fine } = req.body;
    const authId = req.user.uid;
    const lostDate = new Date();

    // --- 1. PRE-CHECKS ---
    const staff = await prisma.staff.findFirst({
      where: { authId },
      select: { id: true },
    });
    if (!staff) {
      return res
        .status(403)
        .json(crs("Authenticated user is not a valid staff member."));
    }

    // --- 2. PROCESS LOST BOOK IN A SINGLE TRANSACTION ---
    const { emailPayload, transactionEmail } = await prisma.$transaction(
      async (tx) => {
        // a. Find the active circulation record
        const circulation = await tx.circulation.findUnique({
          where: { id: circulationId },
          include: {
            bookAccession: { include: { book: true } },
            libraryCard: { include: { member: true } },
          },
        });

        // Ensure the book is actually issued and not already returned
        if (!circulation || circulation.returnDate) {
          throw new Error("P2025"); // Prisma's "Record not found" error code
        }

        // b. Create a separate DEBIT transaction for the lost book fine
        const lostBookFee = fine * 100; // Convert to cents
        let transactionEmailData = null;

        if (lostBookFee > 0) {
          const memberBalance = circulation.libraryCard.member.balance;
          const newBalance = memberBalance - lostBookFee; // Debit decreases balance

          const transaction = await tx.transaction.create({
            data: {
              memberId: circulation.libraryCard.memberId,
              circulationId: circulation.id, // Link the fine to the original loan
              transactionType: "DEBIT",
              category: "book_lost_fee",
              amount: lostBookFee,
              paymentMethod: "auto_debit",
              issuedById: staff.id,
              remark: "Fee for lost book",
            },
          });

          await tx.member.update({
            where: { id: circulation.libraryCard.memberId },
            data: { balance: newBalance },
          });

          transactionEmailData = {
            email: circulation.libraryCard.member.email,
            fullName: circulation.libraryCard.member.fullName,
            transactionType: transaction.transactionType,
            amount: transaction.amount / 100,
            balance: newBalance / 100,
            category: transaction.category,
            date: new Date(transaction.createdAt).toLocaleDateString(),
          };
        }

        // c. "Return" the book to close the circulation record
        await tx.circulation.update({
          where: { id: circulationId },
          data: {
            returnDate: lostDate,
            returnedById: staff.id,
            returnRemark: `Book reported as lost. ${returnRemark || ""}`.trim(),
          },
        });

        // d. Update statuses: Mark the physical book as 'lost'
        await tx.libraryCard.update({
          where: { id: circulation.libraryCard.id },
          data: { status: "available" }, // Card is now free
        });
        await tx.accession.update({
          where: { id: circulation.bookAccessionId },
          data: { status: "lost" }, // This copy is now out of circulation
        });

        // e. Prepare a confirmation email payload for the 'return' action
        const returnEmailPayload = {
          name: circulation.libraryCard.member.fullName,
          email: circulation.libraryCard.member.email,
          accessionNumber: circulation.bookAccession.accessionNumber,
          title: circulation.bookAccession.book.title,
          returnDate: lostDate.toLocaleDateString(),
          issueDate: new Date(circulation.issueDate).toLocaleDateString(),
          fine: "N/A (See Lost Book Fee)",
          cardNumber: circulation.libraryCard.cardNumber,
        };

        return {
          emailPayload: returnEmailPayload,
          transactionEmail: transactionEmailData,
        };
      }
    );

    // --- 3. SEND NOTIFICATIONS (Non-blocking) ---
    if (emailPayload) {
      const { email, ...details } = emailPayload;
      emailService.sendReturnConfirmationEmail(email, {
        ...details,
        isLost: true,
      });
    }
    if (transactionEmail) {
      const { email, ...details } = transactionEmail;
      emailService.sendTransactionConfirmationEmail(email, details);
    }

    return res.status(200).json(crs.RETURN_200_LOST_SUCCESS());
  } catch (error) {
    createLog(error);
    if (error.message === "P2025") {
      return res
        .status(404)
        .json(
          crs(
            "Action failed: The book issue record was not found or has already been processed."
          )
        );
    }
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
