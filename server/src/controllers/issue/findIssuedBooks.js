import prisma from "../../services/prisma.js";
import { fetchSettings } from "../settings.controller.js";

/**
 * Fetches a paginated list of currently issued books with calculated fines.
 * @param {object} queryParam - The query parameters for filtering and pagination.
 * @param {string} [queryParam.name] - The filter type (e.g., 'irn', 'due', 'acc', 'card').
 * @param {string} [queryParam.value] - The value for the filter.
 * @param {number} [queryParam.page=1] - The page number for pagination.
 * @returns {Promise<{data: object[], totalPages: number}|false>} An object with data and total pages, or false if no data is found.
 */

export const findIssuedBooks = async (queryParam) => {
  const { name, value, page = 1 } = queryParam || {};
  const pageSize = 10;
  const now = new Date();

  let where = {};

  // Build the filter query based on input
  switch (name) {
    case "irn":
      if (value)
        where.issueRefNumber = { contains: value, mode: "insensitive" };
      break;
    case "due":
      where.dueDate = { lt: now };
      break;
    case "acc":
      var accessionNum = parseInt(value, 10);
      if (!isNaN(accessionNum)) {
        where.bookAccession = { accessionNumber: accessionNum };
      }
      break;
    case "card":
      if (value)
        where.libraryCard = {
          cardNumber: { contains: value, mode: "insensitive" },
        };
      break;
  }

  const [totalCount, data] = await prisma.$transaction([
    prisma.issuedBook.count({ where }),
    prisma.issuedBook.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {
        id: true,
        issueRefNumber: true,
        issueDate: true,
        dueDate: true,
        bookAccession: {
          select: {
            accessionNumber: true,
            timesIssued: true,
            book: {
              select: {
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
                fullName: true,
                membershipId: true,
                photo: true,
                memberType: true,
              },
            },
          },
        },
      },
      orderBy: { issueDate: "desc" },
    }),
  ]);

  // If no records are found, return false.
  if (totalCount === 0) {
    return false;
  }

  // Fetch fine rates once.
  const fineSettings = await fetchSettings("FINE-PER-DAY");
  const fineRates = fineSettings?.value || {};

  // Enhance data with calculated fields.
  const enhancedData = data.map((item) => {
    const isOverdue = item.dueDate < now;
    const daysOverdue = isOverdue
      ? Math.floor((now - item.dueDate) / (1000 * 60 * 60 * 24))
      : 0;

    // Correctly determine the fine rate for each member.
    const memberType = item.libraryCard.member.memberType;
    const FINE_PER_DAY = fineRates[memberType] || 0; // Default to 0 if not found

    const fineAmount = isOverdue ? daysOverdue * FINE_PER_DAY : 0;

    return {
      id: item.id,
      issueRefNumber: item.issueRefNumber,
      bookTitle: item.bookAccession.book.title,
      bookAuthor: item.bookAccession.book.author,
      accessionNumber: item.bookAccession.accessionNumber,
      memberName: item.libraryCard.member.fullName,
      membershipId: item.libraryCard.member.membershipId,
      photo: item.libraryCard.member.photo,
      issueDate: item.issueDate.toISOString(),
      dueDate: item.dueDate.toISOString(),
      status: isOverdue ? "overdue" : "active",
      daysOverdue,
      fineAmount,
      timesIssued: item.bookAccession.timesIssued || 0,
    };
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: enhancedData,
    totalPages,
  };
};
