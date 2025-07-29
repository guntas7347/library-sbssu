import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { approveApplication } from "../../controllers/applications/approveApplication.js";
import { rejectApplication } from "../../controllers/applications/rejectApplication.js";
import prisma from "../../services/prisma.js";

/**
 * Handles the decision to approve or reject a membership application.
 */
export const handleApplicationDecision = async (req, res, next) => {
  try {
    const { id, decision } = req.vBody; // From Zod validation middleware
    const authId = req.user.uid; // The ID from the Auth table

    // Find the Staff ID linked to the current user's Auth ID.
    const staff = await prisma.staff.findFirst({
      where: { authId },
      select: { id: true },
    });

    // If no staff profile is linked to the user, deny access.
    if (!staff?.id) return res.status(403).json(crs.AUTH_403_FORBIDDEN());

    const staffId = staff.id; // This is the correct staffId.

    if (decision === "approve") {
      const result = await approveApplication(id, staffId);
      req.context = { ...req.context, decision: true, ...result };
    } else if (decision === "reject") {
      const result = await rejectApplication(id);
      req.context = { ...req.context, decision: false, ...result };
    } else {
      // Handle invalid decision value
      return res
        .status(400)
        .json(crs.ZOD_400_INVALID_INPUT("Invalid decision value."));
    }

    next(); // Pass to the final response middleware
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
