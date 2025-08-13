import prisma from "../../services/prisma.js";
import { createLog } from "../../utils/log.js";
import { generateLibraryCardId } from "../../utils/functions/idGenerator.js";
import { getCardExpiry } from "../../controllers/libraryCards/cards.controller.js";
import crs from "../../utils/crs/crs.js";

/**
 * Fetches member details and prepares data for allotting a new library card.
 *
 * @route GET /members/fetch-for-allot
 * @queryParam {string} id - The member's ID (validated).
 */
export const fetchMemberForAllotHandler = async (req, res) => {
  try {
    const { id } = req.validatedQuery;

    // Fetch member and their library cards
    const member = await prisma.member.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        photo: true,
        membershipId: true,
        program: true,
        memberType: true,
        batch: true,
        libraryCards: {
          select: {
            id: true,
            cardNumber: true,
            status: true,
            type: true,
            expiry: true,
          },
          orderBy: {
            cardNumber: "asc", // For determining last issued card
          },
        },
      },
    });

    if (!member) {
      return res.status(404).json(crs("Member not found."));
    }

    // Calculate new card expiry
    const newCardExpiryDate = await getCardExpiry(member.batch, member.program);

    // Determine the last card's sequence number
    const lastCard = member.libraryCards.at(-1); // safe alternative to slice[-1]
    const lastSequence = lastCard?.cardNumber?.split("-").pop() || "0";
    const nextCardSequence = Number(lastSequence) + 1;

    // Generate new card number
    const nextCardNumber = generateLibraryCardId(
      member.membershipId,
      nextCardSequence
    );

    // Assemble data for frontend
    const responseData = {
      ...member,
      newCardExpiryDate,
      nextCardNumber,
    };

    return res.status(200).json(crs.MEMBER_200_FETCHED(responseData));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
