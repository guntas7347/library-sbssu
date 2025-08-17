import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches a complete profile for a single member, including academic details,
 * financial summary, issued books, and recent activities, using the new schema.
 *
 * @async
 * @function fetchMemberProfileHandler
 * @param {import("express").Request} req - Express request (expects `validatedQuery.id`)
 * @param {import("express").Response} res - Express response
 * @returns {Promise<void>}
 */
export const fetchMemberProfileHandler = async (req, res) => {
  try {
    const { id } = req.validatedQuery;

    // 1. Fetch member with all relevant relations using the new 'circulations' model
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        libraryCards: {
          include: {
            // CHANGE: Replaced issuedBooks and returnedBooks with 'circulations'
            circulations: {
              include: {
                bookAccession: {
                  include: {
                    book: { select: { title: true, author: true } },
                  },
                },
              },
              orderBy: { issueDate: "desc" }, // Order by most recent issues first
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

    // Consolidate all circulations from all library cards into a single array
    const allCirculations = member.libraryCards.flatMap(
      (card) => card.circulations
    );

    // 2. Calculate financial summary (No changes needed here)
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
    // CHANGE: Filter circulations where returnDate is null
    const currentBooks = allCirculations
      .filter((circ) => circ.returnDate === null)
      .map((circ) => {
        const due = new Date(circ.dueDate);
        return {
          id: circ.id,
          title: circ.bookAccession.book.title,
          author: circ.bookAccession.book.author,
          dueDate: due.toLocaleDateString(),
          status: due < new Date() ? "Overdue" : "Issued",
        };
      });

    // 4. Recent activities (returns + payments)
    // CHANGE: Filter circulations where returnDate is NOT null for returns
    const returns = allCirculations
      .filter((circ) => circ.returnDate !== null)
      .slice(0, 3) // Takes the 3 most recently issued-and-returned books
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
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // 5. Farthest card expiry (No changes needed here)
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
        // CHANGE: Calculate returned books from the filtered circulations
        booksReturned: allCirculations.filter(
          (circ) => circ.returnDate !== null
        ).length,
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
