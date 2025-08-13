import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches all library cards for a member and formats them
 * for the LibraryCard frontend component.
 *
 * @async
 * @function findLibraryCardsHandler
 * @param {import("express").Request} req - Express request (expects validatedQuery with `id`)
 * @param {import("express").Response} res - Express response
 */
export const findLibraryCardsHandler = async (req, res) => {
  try {
    const { id: memberId } = req.validatedQuery;

    const cards = await prisma.libraryCard.findMany({
      where: { memberId },
      select: {
        id: true,
        cardNumber: true,
        status: true,
        type: true,
        expiry: true,
        createdAt: true,
        updatedAt: true,
        autoAlloted: true,
        member: {
          select: {
            fullName: true,
            membershipId: true,
            photo: true,
          },
        },
        staff: {
          select: {
            fullName: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc", // Prioritize recently updated cards
      },
    });

    const formattedCards = cards.map((card) => ({
      id: card.id,
      cardNumber: card.cardNumber,
      status: card.status,
      type: card.type,
      expiry: card.expiry,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
      autoAlloted: card.autoAlloted,
      fullName: card.member?.fullName ?? "Unknown",
      membershipId: card.member?.membershipId ?? "N/A",
      photo: card.member?.photo ?? null,
      staff: card.staff?.fullName ?? "System",
    }));

    return res.status(200).json(crs.MEMBER_200_CARDS_FETCHED(formattedCards));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
