import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { approveApplication } from "../../controllers/applications/approveApplication.js";
import { rejectApplication } from "../../controllers/applications/rejectApplication.js";
import { emailService } from "../../services/emailService.js";

/**
 * Handles the decision to approve or reject a membership application,
 * processes the change, and sends the corresponding notification email.
 */

export const handleApplicationDecision = async (req, res) => {
  try {
    // 1. Get validated input and authenticated user's ID
    const { id, decision } = req.body; // From Zod validation middleware
    const authId = req.user.uid; // From authentication middleware

    // 2. Verify the user is a staff member and get their staff ID
    const staff = await prisma.staff.findFirst({
      where: { authId },
      select: { id: true },
    });

    // If no staff profile is linked to the user, deny access.
    if (!staff?.id) {
      return res.status(403).json(crs.AUTH_403_FORBIDDEN());
    }
    const staffId = staff.id;

    // 3. Process the decision
    if (decision === "approve") {
      // Approve the application in the database
      const approvalResult = await approveApplication(id, staffId);

      // Send the approval email
      await emailService.sendApprovalEmail(
        approvalResult.email,
        approvalResult.fullName,
        approvalResult.membershipId,
        approvalResult.libraryCards
      );

      // Send the final success response
      return res.status(200).json(crs.APPLICATION_200_APPROVED());
    } else if (decision === "reject") {
      // Reject the application in the database
      const rejectionResult = await rejectApplication(id);

      // Send the rejection email
      await emailService.sendRejectionEmail(
        rejectionResult.email,
        rejectionResult.fullName
      );

      // Send the final success response
      return res.status(200).json(crs.APPLICATION_200_REJECTED());
    }
  } catch (error) {
    // 4. Catch any errors during the process
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
