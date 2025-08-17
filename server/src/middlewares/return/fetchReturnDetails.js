import { fetchSettings } from "../../controllers/settings.controller.js";
import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * For searching issued book for returning purpose.
 */
export const fetchReturnDetailsHandler = async (req, res) => {
  try {
    // 1. Get the validated accession number from the query
    const { number: accessionNumber } = req.validatedQuery;

    // 2. Find the unique active circulation record for the given accession number
    // CHANGE: Switched from `issuedBook.findFirst` to `circulation.findFirst`
    // ADDED: A condition to only find records where `returnDate` is null.
    const activeCirculation = await prisma.circulation.findFirst({
      where: {
        bookAccession: { accessionNumber },
        returnDate: null, // This ensures we only get currently issued books
      },
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

    // 3. If no active circulation is found, return a 404
    if (!activeCirculation) {
      return res.status(404).json(crs("This book is not currently issued."));
    }

    // 4. Calculate the overdue fine
    const now = new Date();
    const fineSettings = await fetchSettings("FINE-PER-DAY");
    const fineRates = fineSettings?.value || {};
    const memberType = activeCirculation.libraryCard.member.memberType;
    const FINE_PER_DAY = fineRates[memberType] || 0;

    const isOverdue = activeCirculation.dueDate < now;
    const daysOverdue = isOverdue
      ? Math.floor((now - activeCirculation.dueDate) / (1000 * 60 * 60 * 24))
      : 0;
    const fineAmount = daysOverdue * FINE_PER_DAY;

    // 5. Format the data for the frontend
    // CHANGE: Renamed `issuedBook` to `activeCirculation` throughout this section
    const returnDetails = {
      issue: {
        id: activeCirculation.id,
        issueRefNumber: activeCirculation.issueRefNumber,
        issueDate: activeCirculation.issueDate.toISOString(),
        dueDate: activeCirculation.dueDate.toISOString(),
        issueCondition: activeCirculation.bookAccession.condition,
        issueRemark: activeCirculation.issueRemark || "None",
        issuedBy: activeCirculation.issuedBy?.fullName ?? "N/A",
        daysOverdue,
      },
      book: {
        id: activeCirculation.bookAccession.book.id,
        title: activeCirculation.bookAccession.book.title,
        author: activeCirculation.bookAccession.book.author,
        accessionNumber: activeCirculation.bookAccession.accessionNumber,
        isbn: activeCirculation.bookAccession.book.isbn,
        category: activeCirculation.bookAccession.category,
        location: activeCirculation.bookAccession.book.location,
      },
      member: {
        id: activeCirculation.libraryCard.member.id,
        fullName: activeCirculation.libraryCard.member.fullName,
        photo: activeCirculation.libraryCard.member.photo,
        program: activeCirculation.libraryCard.member.program,
        membershipId: activeCirculation.libraryCard.member.membershipId,
        cardNumber: activeCirculation.libraryCard.cardNumber,
      },
      fine: fineAmount,
    };

    return res.status(200).json(crs.RETURN_200_FETCHED(returnDetails));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
