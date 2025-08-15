import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

export const fetchReturnBookDetailsHandler = async (req, res) => {
  try {
    // 1. Fetch the complete ReturnedBook record and its relations using the ID from the query.
    const returnedBook = await prisma.returnedBook.findUnique({
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

    // 2. If no record is found, return a 404 response.
    if (!returnedBook) {
      return res
        .status(404)
        .json(crs.ERR_404_NOT_FOUND("Return record not found."));
    }

    // 3. Transform the nested data into a clean object for the frontend.
    const returnDetails = {
      id: returnedBook.id,
      issueRefNumber: returnedBook.issueRefNumber,
      issueDate: returnedBook.issueDate.toISOString(),
      dueDate: returnedBook.dueDate.toISOString(),
      returnDate: returnedBook.returnDate.toISOString(),
      issuedBy: returnedBook.issuedBy?.fullName ?? "N/A",
      returnedBy: returnedBook.returnedBy?.fullName ?? "N/A",
      remarks: {
        issue: returnedBook.issueRemark,
        return: returnedBook.returnRemark,
      },
      book: {
        id: returnedBook.bookAccession?.book?.id,
        title: returnedBook.bookAccession?.book?.title,
        author: returnedBook.bookAccession?.book?.author,
        category: returnedBook.bookAccession?.category,
        accessionNumber: returnedBook.bookAccession?.accessionNumber,
        timesIssued: returnedBook.bookAccession?.timesIssued,
      },
      member: {
        id: returnedBook.libraryCard?.member?.id,
        fullName: returnedBook.libraryCard?.member?.fullName,
        photo: returnedBook.libraryCard?.member?.photo,
        program: returnedBook.libraryCard?.member?.program,
        cardNumber: returnedBook.libraryCard?.cardNumber,
      },
      fine: {
        id: returnedBook.fine?.id ?? null,
        amount: returnedBook.fine?.amount / 100 || 0,
        paidOn: returnedBook.fine?.createdAt?.toISOString() ?? null,
        paymentMethod: returnedBook.fine?.paymentMethod ?? "N/A",
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
