import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Handles the update of a member's profile information, including their
 * associated authentication email.
 */
export const updateMemberHandler = async (req, res) => {
  try {
    // Separate the email from the rest of the member data
    const { id: memberId, email, ...memberData } = req.body;

    // Use a transaction to update both the Member and Auth tables atomically
    const updatedMember = await prisma.$transaction(async (tx) => {
      // 1. Update the main member details if any were provided
      if (Object.keys(memberData).length > 0) {
        await tx.member.update({
          where: { id: memberId },
          data: memberData,
        });
      }

      // 2. Update the email in the related Auth table if it was provided
      if (email) {
        await tx.auth.update({
          where: { memberId },
          data: { email },
        });

        await tx.member.update({ where: { id: memberId }, data: { email } });
      }

      // 3. Fetch the final, updated member data to return in the response
      return tx.member.findUnique({
        where: { id: memberId },
      });
    });

    return res.status(200).json(crs.MEMBER_200_UPDATED(updatedMember));
  } catch (error) {
    createLog(error);

    // Handle the case where the member or auth record to update doesn't exist
    if (error.code === "P2025") {
      return res
        .status(404)
        .json(crs("The member you tried to update does not exist."));
    }

    return res
      .status(500)
      .json(crs("An unexpected error occurred while updating the member."));
  }
};
