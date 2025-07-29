import prisma from "../../../services/prisma.js";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";

export const checkAccessionsAvailability = async (req, res, next) => {
  try {
    console.log(req.vBody);

    const { accessions } = req.vBody;
    for (const { accessionNumber } of accessions) {
      const doc = await prisma.accession.findUnique({
        where: { accessionNumber },
      });
      if (doc) return res.status(404).json(crs.BOOK_409_ACCESSION_CONFLICT());
    }
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const createBook = async (req, res, next) => {
  try {
    console.log(req.vBody);
    const { accessions, category, ...bookData } = req.vBody;

    await prisma.$transaction(async (tx) => {
      const book = await tx.book.create({
        data: bookData,
      });

      for (const { accessionNumber, condition } of accessions) {
        await tx.accession.create({
          data: {
            bookId: book.id,
            accessionNumber: Number(accessionNumber),
            condition,
            category: category,
          },
        });
      }
    });

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
