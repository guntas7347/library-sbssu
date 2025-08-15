import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

export const findBooksHandler = async (req, res) => {
  try {
    const { filter, value: filterValue, page = 1 } = req.validatedQuery;

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

      case "category":
        where = {
          accessions: {
            some: {
              category: {
                contains: filterValue,
                mode: "insensitive",
              },
            },
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

    const totalAccessions = await prisma.accession.count({
      where: { book: where },
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

    if (totalPages === 0)
      return res
        .status(404)
        .json(crs("No Books found matching your criteria."));

    const data = {
      data: booksWithDerivedFields,
      totalPages,
      totalCount: `${totalCount} Books and their ${totalAccessions} accessions`,
    };

    return res.status(200).json(crs.BOOK_200_ALL_FETCHED(data));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
