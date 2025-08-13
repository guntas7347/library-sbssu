import prisma from "../../services/prisma.js";

/**
 * Updates the status of a specific library card.
 * @param {string} cardId - The ID of the card to update.
 * @param {string} newStatus - The new status to set (e.g., 'frozen', 'blocked').
 * @returns {Promise<object>} The updated library card object.
 * @throws {Error} If the card is not found, already blocked, or if the new status is invalid.
 */
export const updateCardStatus = async (cardId, newStatus) => {
  // First, retrieve the card to check its current status.
  const currentCard = await prisma.libraryCard.findUnique({
    where: { id: cardId },
    select: { status: true },
  });

  if (!currentCard) throw new Error("Card not found.");

  // Enforce the business rule: a blocked card's status cannot be changed.
  if (currentCard.status === "blocked") {
    throw new Error(
      "A permanently blocked card cannot have its status changed."
    );
  }

  // Proceed with the update.
  const updatedCard = await prisma.libraryCard.update({
    where: { id: cardId },
    data: { status: newStatus },
  });

  return updatedCard;
};
