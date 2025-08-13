import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { emailService } from "../../services/emailService.js";
import { fetchSettings } from "../../controllers/settings.controller.js";

/**
 * A self-contained handler for the entire book return process.
 */
export const returnBookHandler = async (req, res) => {
  try {
    const { id: issuedBookId, returnRemark } = req.body;
    const authId = req.user.uid;
    const returnDate = new Date();

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

    // --- 2. PROCESS RETURN IN A SINGLE TRANSACTION ---
    const { emailPayload, transactionPayload } = await prisma.$transaction(
      async (tx) => {
        const issuedBook = await tx.issuedBook.findUnique({
          where: { id: issuedBookId },
          include: {
            bookAccession: { include: { book: true } },
            libraryCard: { include: { member: true } },
          },
        });

        if (!issuedBook) {
          // Throw a specific error to be caught by the catch block
          throw new Error("P2025");
        }

        // a. Calculate Fine
        const fineSettings = await fetchSettings("FINE-PER-DAY", tx);
        const fineRates = fineSettings?.value || {};
        const memberType = issuedBook.libraryCard.member.memberType;
        const FINE_PER_DAY = fineRates[memberType] || 0;
        const daysOverdue = Math.max(
          0,
          Math.floor((returnDate - issuedBook.dueDate) / (1000 * 60 * 60 * 24))
        );
        const fineAmount = daysOverdue * FINE_PER_DAY;

        // b. Create ReturnedBook record
        const returnedBook = await tx.returnedBook.create({
          data: {
            bookAccessionId: issuedBook.bookAccessionId,
            libraryCardId: issuedBook.libraryCard.id,
            issueDate: issuedBook.issueDate,
            dueDate: issuedBook.dueDate,
            returnDate,
            issuedById: issuedBook.issuedById,
            returnedById: staff.id,
            issueRemark: issuedBook.issueRemark,
            returnRemark,
            issueRefNumber: issuedBook.issueRefNumber,
          },
        });

        // c. Create Transaction if there is a fine
        let transactionPayload = null;
        if (fineAmount > 0) {
          const memberBalance = issuedBook.libraryCard.member.balance;
          const newBalance = memberBalance + fineAmount;

          const transaction = await tx.transaction.create({
            data: {
              memberId: issuedBook.libraryCard.memberId,
              returnedBookId: returnedBook.id,
              transactionType: "DEBIT",
              category: "book_overdue",
              amount: fineAmount,
              paymentMethod: "auto-debit",
              issuedById: staff.id,
              closingBalance: newBalance,
            },
          });
          await tx.member.update({
            where: { id: issuedBook.libraryCard.memberId },
            data: { balance: newBalance },
          });
          await tx.returnedBook.update({
            where: { id: returnedBook.id },
            data: { fineId: transaction.id },
          });

          transactionPayload = {
            email: issuedBook.libraryCard.member.email,
            fullName: issuedBook.libraryCard.member.fullName,
            transactionType: transaction.transactionType,
            amount: transaction.amount,
            balance: transaction.closingBalance,
            category: transaction.category,
            date: new Date(transaction.createdAt).toLocaleDateString(),
          };
        }

        // d. Update statuses and delete the original issue record
        await tx.issuedBook.delete({ where: { id: issuedBook.id } });
        await tx.libraryCard.update({
          where: { id: issuedBook.libraryCard.id },
          data: { status: "available" },
        });
        await tx.accession.update({
          where: { id: issuedBook.bookAccessionId },
          data: { status: "available" },
        });

        const emailPayload = {
          name: issuedBook.libraryCard.member.fullName,
          email: issuedBook.libraryCard.member.email,
          accessionNumber: issuedBook.bookAccession.accessionNumber,
          title: issuedBook.bookAccession.book.title,
          author: issuedBook.bookAccession.book.author,
          returnDate: returnDate.toLocaleDateString(),
          issueDate: new Date(issuedBook.issueDate).toLocaleDateString(),
          fine: `₹${fineAmount.toFixed(2)}`,
          cardNumber: issuedBook.libraryCard.cardNumber,
        };

        return { emailPayload, transactionPayload };
      }
    );

    // --- 3. SEND NOTIFICATIONS (Non-blocking) ---
    if (emailPayload) {
      const { email, ...details } = emailPayload;
      emailService.sendReturnConfirmationEmail(email, details);
    }
    if (transactionPayload) {
      const { email, ...details } = transactionPayload;
      emailService.sendTransactionConfirmationEmail(email, details);
    }

    return res.status(200).json(crs.RETURN_201_BOOK_ISSUED());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
