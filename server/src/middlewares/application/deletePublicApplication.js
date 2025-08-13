import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { decrptText } from "../../utils/encrypt.crypto.js"; // Ensure this path is correct

/**
 * A self-contained middleware to handle the deletion of a public application.
 */
export const deletePublicApplicationHandler = async (req, res) => {
  try {
    // 1. Get the encrypted ID from the validated request body
    const { gh } = req.body;

    // 2. Decrypt the ID
    const applicationId = decrptText(gh);
    if (!applicationId) {
      return res.status(400).json(crs("Invalid or malformed tracking cookie."));
    }

    // 3. Delete the application if it's still in the "applied" state
    const result = await prisma.member.deleteMany({
      where: {
        id: applicationId,
        status: "applied", // Safety check: only pending applications can be deleted
      },
    });

    // 4. Check if a record was actually deleted
    if (result.count === 0) {
      return res
        .status(404)
        .json(crs("No pending application found to delete."));
    }

    // TODO: Add logic here to delete the associated profile photo from storage.

    // 5. Clear the tracking cookie from the user's browser
    res.clearCookie("gh");

    // 6. Send a success response
    return res.status(200).json(crs.PUBLIC_200_APPLICATION_DELETED());
  } catch (error) {
    createLog(error);
    return res
      .status(500)
      .json(
        crs("An unexpected error occurred while deleting the application.")
      );
  }
};
