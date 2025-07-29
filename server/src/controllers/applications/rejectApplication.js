import prisma from "../../services/prisma.js";

/**
 * Rejects a member application.
 * @param {string} applicationId - The ID of the member application to reject.
 * @returns {Promise<object>} An object containing the details of the rejected member.
 */
export const rejectApplication = async (applicationId) => {
  const rejectedMember = await prisma.member.update({
    where: { id: applicationId },
    data: { status: "rejected" },
    select: { fullName: true, email: true },
  });
  return rejectedMember;
};
