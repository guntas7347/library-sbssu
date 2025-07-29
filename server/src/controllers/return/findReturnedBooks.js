import prisma from "../../services/prisma.js";

export const findReturnedBooks = async (filter, page = 1) => {
  const { name, value } = filter || {};
  const pageSize = 15;

  let where = {};

  // Build the filter query based on the provided input
  switch (name) {
    case "acc": // Filter by Accession Number
      var accessionNum = parseInt(value, 10);
      if (!isNaN(accessionNum)) {
        where.bookAccession = { accessionNumber: accessionNum };
      }
      break;
    case "card": // Filter by Library Card Number
      if (value) {
        where.libraryCard = {
          cardNumber: { contains: value, mode: "insensitive" },
        };
      }
      break;
  }

  // Use a transaction for efficiency: get count and data in one database round-trip
  const [totalCount, data] = await prisma.$transaction([
    prisma.returnedBook.count({ where }),
    prisma.returnedBook.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {
        id: true,
        returnDate: true,
        issueDate: true,
        dueDate: true,
        returnRemark: true, // This can be used for the 'condition'
        fine: {
          // Fetch the related transaction to get the fine amount
          select: {
            amount: true,
          },
        },
        bookAccession: {
          select: {
            accessionNumber: true,
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
            member: {
              select: {
                fullName: true,
                membershipId: true,
                photo: true,
              },
            },
          },
        },
      },
      orderBy: { returnDate: "desc" },
    }),
  ]);

  // Enhance the data with calculated fields for easier frontend rendering
  const enhancedData = data.map((item) => {
    const returnDate = new Date(item.returnDate);
    const issueDate = new Date(item.issueDate);
    const dueDate = new Date(item.dueDate);

    // Calculate duration in days
    const borrowDuration = Math.ceil(
      (returnDate - issueDate) / (1000 * 60 * 60 * 24)
    );

    // Check if the book was returned late
    const isLate = returnDate > dueDate;

    return {
      id: item.id,
      bookTitle: item.bookAccession.book.title,
      bookAuthor: item.bookAccession.book.author,
      accessionNumber: item.bookAccession.accessionNumber,
      memberName: item.libraryCard.member.fullName,
      membershipId: item.libraryCard.member.membershipId,
      photo: item.libraryCard.member.photo,
      returnDate: returnDate.toLocaleDateString(), // Format for display
      borrowDuration,
      isLate,
      // Use returnRemark for condition, fallback to 'Unknown'
      condition: item.returnRemark || "Unknown",
      // Safely access the fine amount from the nested transaction record
      fine: item.fine?.amount || 0,
    };
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: enhancedData,
    totalPages,
  };
};
