import { fetchSettings } from "../../controllers/settings.controller.js";
import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained handler to fetch all details needed for a book return.
 */
export const fetchReturnDetailsHandler = async (req, res) => {
  try {
    // 1. Get the validated accession number from the query
    const { number: accessionNumber } = req.validatedQuery;

    // 2. Find the unique issued book record
    const issuedBook = await prisma.issuedBook.findFirst({
      where: { bookAccession: { accessionNumber } },
      select: {
        id: true,
        issueRefNumber: true,
        issueDate: true,
        dueDate: true,

        issueRemark: true,
        issuedBy: { select: { fullName: true } },
        bookAccession: {
          select: {
            accessionNumber: true,
            category: true,
            condition: true,
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
                memberType: true,
              },
            },
          },
        },
      },
    });

    // 3. If no issued book is found, return a 404
    if (!issuedBook) {
      return res.status(404).json(crs("This book is not currently issued."));
    }

    // 4. Calculate the overdue fine
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

    // 5. Format the data for the frontend
    const returnDetails = {
      issue: {
        id: issuedBook.id,
        issueRefNumber: issuedBook.issueRefNumber,
        issueDate: issuedBook.issueDate.toISOString(),
        dueDate: issuedBook.dueDate.toISOString(),
        issueCondition: issuedBook.bookAccession.condition,
        issueRemark: issuedBook.issueRemark || "None",
        issuedBy: issuedBook.issuedBy?.fullName ?? "N/A",
        daysOverdue,
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

    return res.status(200).json(crs.RETURN_200_FETCHED(returnDetails));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
