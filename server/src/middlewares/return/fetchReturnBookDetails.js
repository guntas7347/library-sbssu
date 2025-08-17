import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches the details of a specific, completed circulation (a returned book).
 */
export const fetchReturnBookDetailsHandler = async (req, res) => {
  try {
    // 1. Fetch the complete Circulation record and its relations using the ID from the query.
    // CHANGE: Switched from `returnedBook` to `circulation` model.
    const circulation = await prisma.circulation.findUnique({
      where: { id: req.query.id },
      select: {
        id: true,
        issueRefNumber: true,
        issueDate: true,
        dueDate: true,
        returnDate: true,
        issueRemark: true,
        returnRemark: true,
        issuedBy: {
          select: {
            fullName: true,
          },
        },
        returnedBy: {
          select: {
            fullName: true,
          },
        },
        bookAccession: {
          select: {
            accessionNumber: true,
            category: true,
            timesIssued: true,
            book: {
              select: {
                id: true,
                title: true,
                author: true,
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
              },
            },
          },
        },
        fine: {
          select: {
            amount: true,
            paymentMethod: true,
            createdAt: true,
            id: true,
          },
        },
      },
    });

    // 2. If no record is found or if the book hasn't been returned yet, return a 404.
    if (!circulation || !circulation.returnDate) {
      return res
        .status(404)
        .json(crs.ERR_404_NOT_FOUND("Return record not found."));
    }

    // 3. Transform the nested data into a clean object for the frontend.
    // CHANGE: Mapped from `circulation` object instead of `returnedBook`.
    const returnDetails = {
      id: circulation.id,
      issueRefNumber: circulation.issueRefNumber,
      issueDate: circulation.issueDate.toISOString(),
      dueDate: circulation.dueDate.toISOString(),
      returnDate: circulation.returnDate.toISOString(),
      issuedBy: circulation.issuedBy?.fullName ?? "N/A",
      returnedBy: circulation.returnedBy?.fullName ?? "N/A",
      remarks: {
        issue: circulation.issueRemark,
        return: circulation.returnRemark,
      },
      book: {
        id: circulation.bookAccession?.book?.id,
        title: circulation.bookAccession?.book?.title,
        author: circulation.bookAccession?.book?.author,
        category: circulation.bookAccession?.category,
        accessionNumber: circulation.bookAccession?.accessionNumber,
        timesIssued: circulation.bookAccession?.timesIssued,
      },
      member: {
        id: circulation.libraryCard?.member?.id,
        fullName: circulation.libraryCard?.member?.fullName,
        photo: circulation.libraryCard?.member?.photo,
        program: circulation.libraryCard?.member?.program,
        cardNumber: circulation.libraryCard?.cardNumber,
      },
      fine: {
        id: circulation.fine?.id ?? null,
        amount: circulation.fine?.amount / 100 || 0,
        paidOn: circulation.fine?.createdAt?.toISOString() ?? null,
        paymentMethod: circulation.fine?.paymentMethod ?? "N/A",
      },
    };

    // 4. Send the successful response.
    return res.status(200).json(crs.RETURN_200_FETCHED(returnDetails));
  } catch (error) {
    // 5. Log the error and send a 500 internal server error response.
    createLog(error, "Failed to fetch return details");
    return res.status(500).json(crs.SERR_500_INTERNAL(error.message));
  }
};
