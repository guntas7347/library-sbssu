import prisma from "../../services/prisma.js";

export const findBooks = async (queryParam) => {
  const { name: filter, value: filterValue, page = 1 } = queryParam;

  const pageSize = 25;
  const skip = (page - 1) * pageSize;

  let where = {};
  let totalCount = 0;

  switch (filter) {
    case "title":
      where = {
        title: {
          contains: filterValue,
          mode: "insensitive",
        },
      };
      totalCount = await prisma.book.count({ where });
      break;

    case "accession":
      where = {
        accessions: {
          some: {
            accessionNumber: Number(filterValue),
          },
        },
      };
      totalCount = await prisma.book.count({ where });
      break;

    default:
      totalCount = await prisma.book.count();
      break;
  }

  const books = await prisma.book.findMany({
    where,
    skip,
    take: pageSize,
    include: {
      accessions: {
        select: {
          accessionNumber: true,
          status: true,
          category: true,
        },
      },
    },
  });

  const booksWithDerivedFields = books.map((book) => {
    const totalCopies = book.accessions.length;
    const availableCopies = book.accessions.filter(
      (a) => a.status === "available"
    ).length;
    const availability = availableCopies > 0;

    // Try to extract most common category/subcategory
    const category =
      book.accessions.find((a) => a.category)?.category || "Book";
    const subcategory = book.tags?.[0] || "Book";

    return {
      ...book,
      totalCopies,
      availableCopies,
      availability,
      category,
      subcategory,
      rating: null, // Placeholder, implement rating logic later if needed
    };
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: booksWithDerivedFields,
    totalPages,
  };
};
