import prisma from "../../services/prisma.js";

/**
 * Stores the password reset code and timestamp in the user's auth record.
 * @param {string} authId - The ID of the user's auth record.
 * @param {string} resetCode - The unique code to store.
 */
export const storeResetCode = async (authId, resetCode) => {
  await prisma.auth.update({
    where: { id: authId },
    data: {
      resetCode: resetCode,
      resetCodeTime: new Date(),
    },
  });
};
