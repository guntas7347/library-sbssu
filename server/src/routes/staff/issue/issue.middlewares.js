import { getNextSequenceValue } from "../../../controllers/getNextSequenceValue.js";
import prisma from "../../../services/prisma.js";
import crs from "../../../utils/crs/crs.js";
import { generateIssueRefNumber } from "../../../utils/functions/idGenerator.js";
import { createLog } from "../../../utils/log.js";

export const verifyAvailability = async (req, res, next) => {
  try {
    const accessionNumber = req.vBody.accessionNumber;
    const cardNumber = req.vBody.cardNumber;

    const acc = await prisma.accession.findUnique({
      where: { accessionNumber, status: "available" },
      select: { id: true },
    });

    if (!acc) return res.status(403).json(crs.ISSUE_403_BOOK_UNAVAILABLE());

    const card = await prisma.libraryCard.findUnique({
      where: { cardNumber, status: "available" },
      select: { id: true },
    });

    if (!card) return res.status(403).json(crs.ISSUE_403_CARD_UNAVAILABLE());

    req.context = { accessionId: acc.id, cardId: card.id };

    return next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const processIssue = async (req, res, next) => {
  try {
    // 1. Get pre-validated data from the request and user session.
    const { accessionId, cardId } = req.context;
    const { issueDate, issueDuration, issueCondition, issueRemark } = req.vBody;
    const authId = req.user.uid;

    // 2. Find the Staff record that is linked to the authenticated user.
    const staff = await prisma.staff.findFirst({
      where: { authId: authId },
      select: { id: true },
    });

    const staffId = staff.id;

    // 3. Calculate the due date.
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + issueDuration);

    // 4. Perform all database writes in a single, atomic transaction.
    await prisma.$transaction(async (tx) => {
      // Update accession and library card status first.

      await tx.accession.update({
        where: { id: accessionId },
        data: { status: "issued" },
      });

      await tx.libraryCard.update({
        where: { id: cardId },
        data: { status: "issued" },
      });
      // Get the next sequence number for the current year.
      const yearSuffix = new Date().getFullYear().toString().slice(-2);
      const sequenceName = `issueRefNumber_${yearSuffix}`;
      const newSequenceValue = await getNextSequenceValue(tx, sequenceName);
      const issueRefNumber = generateIssueRefNumber(newSequenceValue);

      // Attempt to create the IssuedBook record.
      await tx.issuedBook.create({
        data: {
          issueRefNumber,
          bookAccession: { connect: { id: accessionId } },
          libraryCard: { connect: { id: cardId } },
          issueDate,
          dueDate,
          issueCondition,
          issuedBy: { connect: { id: staffId } },
          issueRemark: issueRemark || null,
        },
      });
    });

    // 5. If successful, pass control to the final response handler.
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
