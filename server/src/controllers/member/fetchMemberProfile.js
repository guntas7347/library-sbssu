import prisma from "../../services/prisma.js";

/**
 * Fetches a complete profile for a single member, including their academic details,
 * financial summary, currently issued books, and recent activities.
 *
 * @param {string} memberId - The ID of the member to fetch.
 * @returns {Promise<object|false>} The formatted member profile object, or false if not found.
 */
export const fetchMemberProfile = async (memberId) => {
  try {
    // 1. Fetch all related data for the member in a single, efficient query.
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        // Get all library cards to process issued books, returns, and expiry dates.
        libraryCards: {
          include: {
            issuedBooks: {
              include: {
                bookAccession: {
                  include: {
                    book: {
                      select: { title: true, author: true },
                    },
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
        // Get all transactions to calculate financial summary.
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
      return false; // Return false if no member is found.
    }

    // 2. Process and transform the raw data into the structure the frontend needs.

    // A. Calculate Financial Summary
    const totalFines = member.transactions
      .filter((t) => t.category === "book overdue")
      .reduce((sum, t) => sum + t.amount, 0);
    const paid = member.transactions
      .filter((t) => t.transactionType === "CREDIT")
      .reduce((sum, t) => sum + t.amount, 0);

    const financialSummary = {
      totalFines,
      paid,
      outstanding: totalFines - paid,
    };

    // B. Get Currently Issued Books
    const currentBooks = member.libraryCards
      .flatMap((card) => card.issuedBooks)
      .map((issue) => {
        const isOverdue = new Date(issue.dueDate) < new Date();
        return {
          id: issue.id,
          title: issue.bookAccession.book.title,
          author: issue.bookAccession.book.author,
          dueDate: new Date(issue.dueDate).toDateString(),
          status: isOverdue ? "Overdue" : "Issued",
        };
      });

    // C. Get Recent Activities (a mix of returns and payments)
    const returnsAsActivity = member.libraryCards
      .flatMap((card) => card.returnedBooks)
      .slice(0, 3) // Limit to the 3 most recent returns
      .map((r) => ({
        id: r.id,
        type: "return",
        action: "Returned Book",
        item: r.bookAccession.book.title,
        date: new Date(r.returnDate).toDateString(),
      }));

    const paymentsAsActivity = member.transactions
      .filter((t) => t.transactionType === "CREDIT")
      .slice(0, 2) // Limit to the 2 most recent payments
      .map((t) => ({
        id: t.id,
        type: "payment",
        action: "Paid Fine/Fee",
        item: `₹${t.amount}`,
        date: new Date(t.createdAt).toDateString(),
      }));

    const recentActivities = [...returnsAsActivity, ...paymentsAsActivity].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // D. ✅ NEW: Calculate Farthest Expiry Date
    let farthestExpiry = "N/A";
    if (member.libraryCards && member.libraryCards.length > 0) {
      const expiryTimestamps = member.libraryCards.map((card) =>
        new Date(card.expiry).getTime()
      );
      const maxTimestamp = Math.max(...expiryTimestamps);
      farthestExpiry = new Date(maxTimestamp).toDateString();
    }

    // 3. Assemble the final, clean data object for the frontend.
    const profileData = {
      // Basic Profile Info
      fullName: member.fullName,
      photo: member.photo,
      email: member.email,
      phoneNumber: member.phoneNumber,
      dob: member.dob,
      streetAddress: member.streetAddress,
      city: member.city,
      fatherName: member.fatherName,
      cast: member.cast,
      status: member.status,
      joinDate: new Date(member.createdAt).toDateString(),
      lastActivity: recentActivities[0]?.date ?? "N/A",
      expiryDate: farthestExpiry, // Added farthest expiry

      // Academic Info
      rollNumber: member.rollNumber,
      memberType: member.memberType,
      program: member.program,
      specialization: member.specialization,
      batch: member.batch,

      // Calculated Summaries
      stats: {
        currentBooks: currentBooks.length,
        booksReturned: member.libraryCards.reduce(
          (sum, card) => sum + card.returnedBooks.length,
          0
        ),
        cardCount: member.libraryCards.length, // ✅ Added card count
      },
      financialSummary,
      currentBooks,
      recentActivities,
    };

    return profileData;
  } catch (error) {
    createLog(error, "Failed to fetch member profile");
    throw error; // Re-throw the error to be handled by the route's error handler
  }
};
