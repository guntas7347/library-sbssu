import prisma from "../../services/prisma.js";
import { decrptText } from "../../utils/encrypt.crypto.js";

/**
 * Fetches a public application by its ID (from URL or encrypted cookie).
 * @param {string} id - The ID from the URL parameter.
 * @param {string} encryptedId - The encrypted ID from the cookie.
 * @returns {Promise<object|null>} The application record or null if not found.
 */
export const fetchPublicApplication = async (id, encryptedId) => {
  const targetId = id || decrptText(encryptedId);

  if (!targetId) return null;

  return await prisma.member.findFirst({
    where: {
      id: targetId,
      // You might want to allow viewing of rejected/approved statuses too
      // status: { in: ["applied", "rejected", "approved"] }
      status: "applied",
    },
  });
};
