/**
 * Generates an array of library card numbers based on a member ID.
 *
 * @param {string} memberId - The member's ID (e.g., "MEM-25-001").
 * @param {number} numberOfCards - The total number of cards to generate.
 * @returns {string[]} An array of formatted card numbers.
 */
export const cardNumbersArray = (memberId, numberOfCards) => {
  // Return an empty array if inputs are invalid to prevent errors.
  if (!memberId || !numberOfCards || numberOfCards <= 0) {
    return [];
  }

  const parts = memberId.split("-");
  // Ensure the memberId is in the expected format.
  if (parts.length !== 3) {
    console.error("Invalid memberId format provided to cardNumbersArray.");
    return [];
  }

  // Construct the base of the card number (e.g., "CRD-25-001").
  const baseCardId = `CRD-${parts[1]}-${parts[2]}`;
  const cardNumberArray = [];

  // Loop from 1 to the required number of cards.
  for (let i = 1; i <= numberOfCards; i++) {
    // Append the padded card index to the base ID.
    const cardNumber = `${baseCardId}-${String(i).padStart(2, "0")}`;
    cardNumberArray.push(cardNumber);
  }

  return cardNumberArray;
};
