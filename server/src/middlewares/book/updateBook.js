import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

export const updateBookHandler = async (req, res) => {
  try {
    const { id: bookId, accessions, newAccessions, ...bookData } = req.body;

    // Use a transaction to ensure all updates are atomic (all or nothing)
    const updatedBook = await prisma.$transaction(async (tx) => {
      // 1. Update the main book details if any were provided
      if (Object.keys(bookData).length > 0) {
        await tx.book.update({
          where: { id: bookId },
          data: bookData,
        });
      }

      // 2. Update existing accessions if the `accessions` array was provided
      if (accessions && accessions.length > 0) {
        for (const accession of accessions) {
          const { id: accessionId, ...accessionData } = accession;
          await tx.accession.update({
            where: { id: accessionId },
            data: accessionData,
          });
        }
      }

      // 3. Create new accessions if the `newAccessions` array was provided
      if (newAccessions && newAccessions.length > 0) {
        await tx.accession.createMany({
          data: newAccessions.map((acc) => ({
            ...acc,
            bookId: bookId, // Link the new accession to the book
          })),
        });
      }

      // 4. Fetch the final, updated book data to return in the response
      return tx.book.findUnique({
        where: { id: bookId },
        include: { accessions: true },
      });
    });

    return res.status(200).json(crs.BOOK_200_UPDATED(updatedBook));
  } catch (error) {
    createLog(error);

    if (error.code === "P2002") {
      return res
        .status(409)
        .json(crs("An accession number you tried to add already exists."));
    }

    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
