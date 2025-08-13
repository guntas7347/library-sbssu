import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Allots a new library card to a member.
 *
 * @route POST /cards/allot
 * @bodyParam {string} memberId - The ID of the member.
 * @bodyParam {string} cardNumber - Generated card number.
 * @bodyParam {string} expiryDate - Expiry date for the card.
 * @bodyParam {string} cardType - Type of the card.
 * @bodyParam {string} [remark] - Optional remark.
 */
export const allotNewCardHandler = async (req, res) => {
  try {
    const { uid } = req.user;

    const staff = await prisma.staff.findFirst({
      where: { authId: uid },
      select: { id: true },
    });

    if (!staff) throw Error();

    const { memberId, cardNumber, expiryDate, cardType, remark } = req.body;

    await prisma.libraryCard.create({
      data: {
        cardNumber,
        expiry: expiryDate,
        type: cardType,
        remark: remark?.trim() || null,
        autoAlloted: false,
        member: { connect: { id: memberId } },
        staff: { connect: { id: staff.id } },
      },
    });

    return res.status(201).json(crs.MEMBER_200_CARD_ALLOTED());
  } catch (error) {
    if (error.code === "P2002")
      return res.status(500).json(crs("Duplicate Card Number"));

    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
