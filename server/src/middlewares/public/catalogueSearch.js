import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained handler for the public library catalogue search.
 * Searches by title, author, or accession number.
 */
export const catalogueSearchHandler = async (req, res) => {
  try {
    // 1. Get the validated search term from the query
    const { search } = req.query;

    // 2. Build the 'where' clause for the Prisma query
    let where = {};
    if (search) {
      where = {
        OR: [
          // Match against the book's title
          { title: { contains: search, mode: "insensitive" } },
          // Match against the book's author
          { author: { contains: search, mode: "insensitive" } },
          // Match against any of the book's related accession numbers
          {
            accessions: {
              some: {
                // Since accession numbers are integers, we try to parse the search term
                // This will fail gracefully if the search term is not a number
                accessionNumber: { equals: parseInt(search, 10) || -1 },
              },
            },
          },
        ],
      };
    }

    // 3. Fetch up to 10 books that match the criteria
    const books = await prisma.book.findMany({
      where,
      take: 10,
      include: {
        // We need the accessions to show copy status and for the search
        accessions: {
          select: {
            accessionNumber: true,
            status: true,
          },
        },
      },
      orderBy: {
        title: "asc", // Order results alphabetically by title
      },
    });

    // 4. Format the data to match the frontend component's expected structure
    const formattedBooks = books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      // Generate a placeholder cover URL
      cover: `https://placehold.co/400x600/3b82f6/ffffff?text=${encodeURIComponent(
        book.title
      )}`,
      accessions: book.accessions.map((acc) => ({
        // The frontend expects 'number', but our DB field is 'accessionNumber'
        number: String(acc.accessionNumber),
        status: acc.status,
      })),
    }));

    return res
      .status(200)
      .json(crs.PUBLIC_200_CATALOGUE_FETCHED(formattedBooks));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
