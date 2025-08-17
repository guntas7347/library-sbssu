import prisma from "../services/prisma.js";
import {
  startOfDay,
  endOfDay,
  subMonths,
  startOfMonth,
  endOfMonth,
} from "date-fns";

export async function getLibraryStats() {
  const today = new Date();

  // Time range for today
  const todayStart = startOfDay(today);
  const todayEnd = endOfDay(today);

  // Time range for current and previous month
  const thisMonthStart = startOfMonth(today);
  const lastMonthStart = startOfMonth(subMonths(today, 1));
  const lastMonthEnd = endOfMonth(subMonths(today, 1));

  // --- Member Statistics (No changes needed here) ---
  const totalMembers = await prisma.member.count({
    where: { status: "active" },
  });

  const newMembersLastMonth = await prisma.member.count({
    where: {
      createdAt: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
      status: "active",
    },
  });

  const newMembersThisMonth = await prisma.member.count({
    where: {
      createdAt: {
        gte: thisMonthStart,
        lte: today,
      },
      status: "active",
    },
  });

  // --- Circulation Statistics (Updated for new schema) ---

  // Books issued today
  // CHANGE: Switched from `issuedBook` to the new `circulation` model.
  const booksIssuedToday = await prisma.circulation.count({
    where: {
      issueDate: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  // Books issued on the same day last month for comparison
  const sameDayLastMonthStart = startOfDay(subMonths(today, 1));
  const sameDayLastMonthEnd = endOfDay(subMonths(today, 1));
  // CHANGE: Switched from `issuedBook` to `circulation`.
  const booksIssuedLastMonthSameDay = await prisma.circulation.count({
    where: {
      issueDate: {
        gte: sameDayLastMonthStart,
        lte: sameDayLastMonthEnd,
      },
    },
  });

  // Overdue books
  // CHANGE: Logic updated for accuracy. An overdue book is one where the
  // due date has passed AND the `returnDate` is null.
  const overdueBooks = await prisma.circulation.count({
    where: {
      dueDate: {
        lt: today,
      },
      returnDate: null, // This is the crucial new condition
    },
  });

  // Overdue books from last month for comparison
  // NOTE: This counts books that BECAME due last month and are still not returned.
  // CHANGE: Updated to use `circulation` and check for `returnDate: null`.
  const overdueBooksLastMonth = await prisma.circulation.count({
    where: {
      dueDate: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
      returnDate: null,
    },
  });

  // Pending returns (total books currently on loan)
  // CHANGE: Logic updated to be more meaningful. This now counts ALL books
  // that have not yet been returned, regardless of due date.
  const pendingReturns = await prisma.circulation.count({
    where: {
      returnDate: null,
    },
  });

  // Books issued last month (used for pending returns comparison)
  // CHANGE: Switched from `issuedBook` to `circulation`. The logic remains
  // the same as your original code for a consistent comparison metric.
  const pendingReturnsLastMonth = await prisma.circulation.count({
    where: {
      issueDate: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
  });

  // Helper function to calculate percentage change
  const percentChange = (current, previous) => {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
  };

  return {
    totalMembers,
    newMembersChange: percentChange(newMembersThisMonth, newMembersLastMonth),

    booksIssuedToday,
    booksIssuedChange: percentChange(
      booksIssuedToday,
      booksIssuedLastMonthSameDay
    ),

    overdueBooks,
    overdueBooksChange: percentChange(overdueBooks, overdueBooksLastMonth),

    pendingReturns,
    pendingReturnsChange: percentChange(
      pendingReturns,
      pendingReturnsLastMonth
    ),
  };
}
