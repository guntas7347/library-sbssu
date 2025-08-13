import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

export const createBookHandler = async (req, res) => {
  try {
    // Use req.body to ensure we are working with validated and coerced data
    const { accessions, ...bookData } = req.body;

    // 1. Get the accession numbers. Zod's `coerce` has already converted them to numbers.
    const accessionNumbers = accessions.map((acc) =>
      Number(acc.accessionNumber)
    );

    // 2. Efficiently check for all duplicate accession numbers in a single query.
    const existingAccessions = await prisma.accession.findMany({
      where: {
        accessionNumber: { in: accessionNumbers },
      },
    });

    if (existingAccessions.length > 0) {
      const existingNumbers = existingAccessions
        .map((a) => a.accessionNumber)
        .join(", ");
      // Return a 409 Conflict with a more descriptive message.
      return res
        .status(409)
        .json(crs(`Following accessions already exist: ${existingNumbers}`));
    }

    // 3. Use a single nested write to create the book and all its accessions.
    // This is atomic and more efficient than multiple separate `create` calls.
    const newBook = await prisma.book.create({
      data: {
        ...bookData,
        accessions: {
          create: accessions.map(
            ({ accessionNumber, condition, category }) => ({
              accessionNumber: Number(accessionNumber),
              condition,
              category,
            })
          ),
        },
      },
      include: {
        accessions: true, // Include the newly created accessions in the response
      },
    });

    // 4. Return a 201 Created status code and the newly created book data.
    return res.status(200).json(crs.BOOK_200_CREATED(newBook));
  } catch (error) {
    createLog(error);
    // This handles the rare case of a race condition where a duplicate is created
    // between the check and the write.
    if (error.code === "P2002") return res.status(409).json(crs("Try Again"));
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
