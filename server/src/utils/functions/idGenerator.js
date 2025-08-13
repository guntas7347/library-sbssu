const getYearSuffix = () => {
  return new Date().getFullYear().toString().slice(-2); // e.g., "25"
};

const padNumber = (num, width) => {
  return String(num).padStart(width, "0");
};

/**
 * Generates a formatted Application ID from a sequence number.
 * @param {number} sequenceNumber The unique number from the sequence.
 * @returns {string} Formatted ID (e.g., "LIB-25-0001").
 */
export const generateApplicationId = (sequenceNumber) => {
  const year = getYearSuffix();
  return `LIB-${year}-${padNumber(sequenceNumber, 4)}`;
};

/**
 * Generates a formatted Member ID from a sequence number.
 * @param {number} sequenceNumber The unique number from the sequence.
 * @returns {string} Formatted ID (e.g., "MEM-25-0001").
 */
export const generateMemberId = (sequenceNumber) => {
  const year = getYearSuffix();
  return `MEM-${year}-${padNumber(sequenceNumber, 4)}`;
};

/**
 * Generates a formatted Library Card ID from a member ID and a copy number.
 * @param {string} memberId The member's full ID (e.g., "MEM-25-0001").
 * @param {number} copyNumber The copy number for the card (e.g., 1, 2).
 * @returns {string|null} Formatted ID (e.g., "CRD-25-0001-01") or null if memberId is invalid.
 */
export function generateLibraryCardId(memberId, copyNumber) {
  if (!memberId) return null;
  const parts = memberId.split("-");
  if (parts.length !== 3) return null;

  const year = parts[1];
  const memberNum = parts[2];
  return `CRD-${year}-${memberNum}-${padNumber(copyNumber, 2)}`;
}

/**
 * Generates a formatted Issue Reference Number from a sequence number.
 * @param {number} sequenceNumber The unique number from the sequence.
 * @returns {string} Formatted ID (e.g., "IRN-25-0001").
 */
export const generateIssueRefNumber = (sequenceNumber) => {
  const year = getYearSuffix();
  return `IRN-${year}-${padNumber(sequenceNumber, 4)}`;
};
