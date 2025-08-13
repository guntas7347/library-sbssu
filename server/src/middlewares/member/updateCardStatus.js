import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Handles updating the status of a library card, with safety checks.
 */
export const updateCardStatusHandler = async (req, res) => {
  try {
    const { id, status } = req.body;

    // 1. Fetch the card first to check its current status.
    const currentCard = await prisma.libraryCard.findUnique({
      where: { id },
    });

    if (!currentCard) {
      return res.status(404).json(crs("Library card not found."));
    }

    // 2. Prevent manual changes to system-managed statuses.
    if (["blocked", "issued"].includes(currentCard.status)) {
      return res
        .status(409)
        .json(crs(`Cannot change status from '${currentCard.status}'.`));
    }

    // 3. If the check passes, proceed with the update.
    const updatedCard = await prisma.libraryCard.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json(crs.MEMBER_200_CARD_UPDATED(updatedCard));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
