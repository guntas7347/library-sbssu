import prisma from "../../services/prisma.js";
import { decrptText } from "../../utils/encrypt.crypto.js";

/**
 * Deletes a public application using an encrypted ID from a cookie.
 * @param {string} encryptedId - The encrypted ID from the cookie.
 * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
 */
export const deletePublicApplication = async (encryptedId) => {
  const id = decrptText(encryptedId);
  if (!id) return false;

  const result = await prisma.member.deleteMany({
    where: {
      id,
      status: "applied", // Only allow deletion of pending applications
    },
  });

  // TODO: Add logic here to delete the associated profile photo from storage.

  // `deleteMany` returns a count. If count is greater than 0, it was successful.
  return result.count > 0;
};
