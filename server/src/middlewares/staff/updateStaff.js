import prisma from "../../services/prisma.js"; // Ensure prisma service is imported
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained middleware to handle updating a staff member's profile.
 * It expects the staff ID in the request parameters (e.g., /staff/:id)
 * and the update data in `req.body` from a validation middleware.
 * This handler includes the business logic for the update.
 */
export const updateStaffHandler = async (req, res) => {
  try {
    // 1. Extract staff ID from URL and validated data from the request body.
    const { id: staffId } = req.body;
    const updateData = req.body;

    // 2. Separate the incoming data for the Staff and Auth models.
    const staffDetails = {};
    const authUpdatePayload = {};

    for (const key in updateData) {
      if (Object.prototype.hasOwnProperty.call(updateData, key)) {
        const value = updateData[key];
        if (["username", "email", "rights"].includes(key)) {
          authUpdatePayload[key] = value;
        } else {
          staffDetails[key] = value;
        }
      }
    }

    // 3. Perform the update within a Prisma transaction for atomicity.
    const updatedStaffMember = await prisma.$transaction(async (tx) => {
      // a. Update the Staff model if there are relevant details.
      if (Object.keys(staffDetails).length > 0) {
        await tx.staff.update({
          where: { id: staffId },
          data: staffDetails,
        });
      }

      // b. Update the related Auth model if there are relevant details.
      if (Object.keys(authUpdatePayload).length > 0) {
        await tx.auth.update({
          where: { staffId },
          data: authUpdatePayload,
        });
      }

      // c. Fetch and return the fully updated staff record.
      return await tx.staff.findUnique({
        where: { id: staffId },
        include: { auth: true }, // Include related auth data in the response
      });
    });

    // 4. Respond with a 200 "OK" status and the updated staff data.
    return res.status(200).json(crs.STAFF_200_UPDATED(updatedStaffMember));
  } catch (error) {
    // 5. Log the detailed error for debugging.
    createLog(error);

    // 6. Provide specific feedback for known errors.
    if (error.code === "P2025") {
      return res
        .status(404)
        .json(
          crs.DATA_204_NOT_FOUND(
            "Staff member with the specified ID does not exist."
          )
        );
    }

    if (error.code === "P2002") {
      const target = error.meta?.target || [];
      if (target.includes("username")) {
        return res.status(409).json(crs.AUTH_409_USERNAME_EXISTS());
      }
      if (target.includes("email")) {
        return res.status(409).json(crs.AUTH_409_EMAIL_EXISTS());
      }
    }

    // For all other errors, send a generic 500 internal server error.
    return res
      .status(500)
      .json(
        crs.SERR_500_INTERNAL(
          "An unexpected error occurred while updating the staff member."
        )
      );
  }
};
