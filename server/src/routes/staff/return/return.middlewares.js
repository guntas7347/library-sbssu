import { calculateFine } from "../../../controllers/return/calculateFine.js";
import { createTransaction } from "../../../controllers/transaction/createTransaction.js";
import prisma from "../../../services/prisma.js";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";

export const processReturn = async (req, res, next) => {
  try {
    const { id: issuedBookId, returnRemark } = req.body;
    const authId = req.user.uid;

    const { fine, returnDate } = await calculateFine(req.body.id);

    // Fetch only the data needed for the final transaction.
    const issuedBook = await prisma.issuedBook.findUnique({
      where: { id: issuedBookId },
      select: {
        id: true,
        issueDate: true,
        dueDate: true,
        issueRemark: true,
        issueRefNumber: true,
        issuedById: true,
        bookAccessionId: true,
        libraryCard: { select: { id: true, memberId: true } },
      },
    });

    if (!issuedBook) {
      return res.status(404).json(crs.DATA_204_NOT_FOUND());
    }

    // Get Staff ID.
    const staff = await prisma.staff.findFirst({
      where: { authId },
      select: { id: true },
    });

    if (!staff) {
      return res.status(403).json(crs.AUTH_403_FORBIDDEN());
    }
    const staffId = staff.id;

    // Perform Atomic Database Transaction using context from `calculateFine`.
    await prisma.$transaction(async (tx) => {
      const returnedBookDoc = await tx.returnedBook.create({
        data: {
          bookAccessionId: issuedBook.bookAccessionId,
          libraryCardId: issuedBook.libraryCard.id,
          issueDate: issuedBook.issueDate,
          dueDate: issuedBook.dueDate,
          returnDate: returnDate,
          issuedById: issuedBook.issuedById,
          returnedById: staffId,
          issueRemark: issuedBook.issueRemark,
          returnRemark: returnRemark,
          issueRefNumber: issuedBook.issueRefNumber,
        },
      });

      // If there's a fine, create a debit transaction for the member.
      if (fine > 0) {
        const transaction = await createTransaction(
          {
            memberId: issuedBook.libraryCard.memberId,
            returnedBookId: returnedBookDoc.id,
            transactionType: "DEBIT",
            category: "book_overdue",
            amount: fine,
            paymentMethod: "auto-debit",
            issuedById: staffId,
          },
          tx
        );

        await tx.returnedBook.update({
          where: { id: returnedBookDoc.id },
          data: { fineId: transaction.id },
        });
      }

      await tx.issuedBook.delete({
        where: { id: issuedBook.id },
      });

      await tx.libraryCard.update({
        where: { id: issuedBook.libraryCard.id },
        data: { status: "available" },
      });

      await tx.accession.update({
        where: { id: issuedBook.bookAccessionId },
        data: { status: "available" },
      });
    });

    next();
  } catch (error) {
    createLog(error);
    if (error.code === "P2025") {
      return res.status(404).json(crs.DATA_204_NOT_FOUND());
    }
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
