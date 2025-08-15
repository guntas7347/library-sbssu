import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches a complete profile for a single member, including academic details,
 * financial summary, issued books, and recent activities.
 *
 * @async
 * @function fetchMemberProfile
 * @param {import("express").Request} req - Express request (expects `validatedQuery.id`)
 * @param {import("express").Response} res - Express response
 * @returns {Promise<void>}
 */
export const fetchMemberProfileHandler = async (req, res) => {
  try {
    const { id } = req.validatedQuery;

    // 1. Fetch member with all relevant relations
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        libraryCards: {
          include: {
            issuedBooks: {
              include: {
                bookAccession: {
                  include: {
                    book: { select: { title: true, author: true } },
                  },
                },
              },
            },
            returnedBooks: {
              select: {
                id: true,
                returnDate: true,
                bookAccession: {
                  include: {
                    book: { select: { title: true } },
                  },
                },
              },
              orderBy: { returnDate: "desc" },
            },
          },
        },
        transactions: {
          select: {
            id: true,
            transactionType: true,
            amount: true,
            category: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!member) {
      return res.status(404).json(crs("Member not found"));
    }

    // 2. Calculate financial summary
    const totalDebitsCents = member.transactions
      .filter((t) => t.transactionType === "DEBIT")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalCreditsCents = member.transactions
      .filter((t) => t.transactionType === "CREDIT")
      .reduce((sum, t) => sum + t.amount, 0);

    const financialSummary = {
      totalDebits: totalDebitsCents / 100,
      totalCredits: totalCreditsCents / 100,
      outstanding: (totalDebitsCents - totalCreditsCents) / 100,
    };

    // 3. Currently issued books
    const currentBooks = member.libraryCards
      .flatMap((card) => card.issuedBooks)
      .map((issue) => {
        const due = new Date(issue.dueDate);
        return {
          id: issue.id,
          title: issue.bookAccession.book.title,
          author: issue.bookAccession.book.author,
          dueDate: due.toLocaleDateString(),
          status: due < new Date() ? "Overdue" : "Issued",
        };
      });

    // 4. Recent activities (returns + payments)
    const returns = member.libraryCards
      .flatMap((card) => card.returnedBooks)
      .slice(0, 3)
      .map((r) => ({
        id: r.id,
        type: "return",
        action: "Returned Book",
        item: r.bookAccession.book.title,
        date: new Date(r.returnDate).toLocaleDateString(),
      }));

    const payments = member.transactions
      .filter((t) => t.transactionType === "CREDIT")
      .slice(0, 2)
      .map((t) => ({
        id: t.id,
        type: "payment",
        action: "Paid Fine/Fee",
        item: `₹${t.amount / 100}`,
        date: new Date(t.createdAt).toLocaleDateString(),
      }));

    const recentActivities = [...returns, ...payments].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // 5. Farthest card expiry
    const farthestExpiry =
      member.libraryCards.length > 0
        ? new Date(
            Math.max(
              ...member.libraryCards.map((c) => new Date(c.expiry).getTime())
            )
          ).toLocaleDateString()
        : "N/A";

    // 6. Construct response
    const profileData = {
      fullName: member.fullName,
      membershipId: member.membershipId,
      photo: member.photo,
      email: member.email,
      phoneNumber: member.phoneNumber ?? "N/A",
      dob: member.dob ? new Date(member.dob).toLocaleDateString() : "N/A",
      streetAddress: member.streetAddress,
      city: member.city,
      state: member.state,
      pinCode: member.pinCode,
      fatherName: member.fatherName ?? "N/A",
      cast: member.cast ?? "N/A",
      status: member.status,
      joinDate: new Date(member.createdAt).toLocaleDateString(),
      lastActivity: recentActivities[0]?.date ?? "N/A",
      expiryDate: farthestExpiry,

      rollNumber: member.rollNumber,
      memberType: member.memberType,
      program: member.program,
      specialization: member.specialization,
      batch: member.batch,

      stats: {
        currentBooks: currentBooks.length,
        booksReturned: member.libraryCards.reduce(
          (sum, card) => sum + card.returnedBooks.length,
          0
        ),
        cardCount: member.libraryCards.length,
      },

      financialSummary,
      currentBooks,
      recentActivities,
    };

    return res.status(200).json(crs.MEMBER_200_FETCHED(profileData));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
