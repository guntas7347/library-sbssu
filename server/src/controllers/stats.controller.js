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

  // Total Members
  const totalMembers = await prisma.member.count({
    where: { status: "active" },
  });

  // New members in the last month
  const newMembersLastMonth = await prisma.member.count({
    where: {
      createdAt: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
      status: "active",
    },
  });

  // New members this month (to compute % change)
  const newMembersThisMonth = await prisma.member.count({
    where: {
      createdAt: {
        gte: thisMonthStart,
        lte: today,
      },
      status: "active",
    },
  });

  // Books issued today
  const booksIssuedToday = await prisma.issuedBook.count({
    where: {
      issueDate: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  // Books issued on the same day last month
  const sameDayLastMonthStart = startOfDay(subMonths(today, 1));
  const sameDayLastMonthEnd = endOfDay(subMonths(today, 1));

  const booksIssuedLastMonthSameDay = await prisma.issuedBook.count({
    where: {
      issueDate: {
        gte: sameDayLastMonthStart,
        lte: sameDayLastMonthEnd,
      },
    },
  });

  // Overdue books (due date has passed and not returned)
  const overdueBooks = await prisma.issuedBook.count({
    where: {
      dueDate: {
        lt: today,
      },
    },
  });

  // Overdue books last month
  const overdueBooksLastMonth = await prisma.issuedBook.count({
    where: {
      dueDate: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
  });

  // Pending returns (books not yet returned)
  const pendingReturns = await prisma.issuedBook.count({
    where: {
      dueDate: { lt: today },
    },
  });

  // Pending returns last month
  const pendingReturnsLastMonth = await prisma.issuedBook.count({
    where: {
      issueDate: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
  });

  // Helper to calculate percentage change
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
