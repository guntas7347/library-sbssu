import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { emailService } from "../../services/emailService.js";
import { getNextSequenceValue } from "../../controllers/getNextSequenceValue.js";
import { generateIssueRefNumber } from "../../utils/functions/idGenerator.js";

/**
 * A self-contained handler for the entire book issuance process.
 */
export const issueBookHandler = async (req, res) => {
  try {
    const {
      accessionNumber,
      cardNumber,
      issueDate,
      issueDuration,
      issueCondition,
      issueRemark,
    } = req.body;
    const authId = req.user.uid;

    // --- 1. VERIFY AVAILABILITY ---
    const accession = await prisma.accession.findUnique({
      where: { accessionNumber, status: "available" },
      select: { id: true },
    });
    if (!accession) {
      return res.status(403).json(crs.ISSUE_403_BOOK_UNAVAILABLE());
    }

    const card = await prisma.libraryCard.findUnique({
      where: { cardNumber, status: "available" },
      select: { id: true },
    });
    if (!card) {
      return res.status(403).json(crs.ISSUE_403_CARD_UNAVAILABLE());
    }

    const staff = await prisma.staff.findFirst({
      where: { authId },
      select: { id: true },
    });
    if (!staff) throw Error();

    // --- 2. PROCESS ISSUE IN A TRANSACTION ---
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + issueDuration);

    const emailPayload = await prisma.$transaction(async (tx) => {
      // a. Update statuses and book condition
      await tx.accession.update({
        where: { id: accession.id },
        data: { status: "issued", condition: issueCondition },
      });
      await tx.libraryCard.update({
        where: { id: card.id },
        data: { status: "issued" },
      });

      // b. Generate unique issue reference number
      const yearSuffix = new Date().getFullYear().toString().slice(-2);
      const sequenceName = `issueRefNumber_${yearSuffix}`;
      const newSequenceValue = await getNextSequenceValue(tx, sequenceName);
      const issueRefNumber = generateIssueRefNumber(newSequenceValue);

      // c. Create the IssuedBook record
      await tx.issuedBook.create({
        data: {
          issueRefNumber,
          bookAccessionId: accession.id,
          libraryCardId: card.id,
          issueDate,
          dueDate,

          issuedById: staff.id,
          issueRemark: issueRemark || null,
        },
      });

      // d. Fetch details for the confirmation email
      const finalDetails = await tx.libraryCard.findUnique({
        where: { id: card.id },
        select: {
          cardNumber: true,
          member: { select: { fullName: true, email: true } },
          issuedBooks: {
            where: { issueRefNumber },
            select: {
              issueDate: true,
              dueDate: true,
              bookAccession: {
                select: {
                  accessionNumber: true,
                  book: { select: { title: true, author: true } },
                },
              },
            },
          },
        },
      });

      const issuedBook = finalDetails.issuedBooks[0];
      return {
        name: finalDetails.member.fullName,
        email: finalDetails.member.email,
        accessionNumber: issuedBook.bookAccession.accessionNumber,
        title: issuedBook.bookAccession.book.title,
        author: issuedBook.bookAccession.book.author,
        dueDate: new Date(issuedBook.dueDate).toLocaleDateString(),
        issueDate: new Date(issuedBook.issueDate).toLocaleDateString(),
        cardNumber: finalDetails.cardNumber,
      };
    });

    // --- 3. SEND CONFIRMATION EMAIL (Non-blocking) ---
    const { email, ...details } = emailPayload;
    emailService.sendIssueConfirmationEmail(email, details);

    return res.status(201).json(crs.ISSUE_201_BOOK_ISSUED());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
