import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { decrptText } from "../../utils/encrypt.crypto.js"; // Ensure this path is correct

/**
 * A self-contained middleware to fetch a public application record.
 * It uses either a direct ID from the URL or an encrypted ID from a cookie.
 */
export const fetchPublicApplicationHandler = async (req, res) => {
  try {
    // 1. Get validated data from the request query
    const { id, type } = req.body;

    // 2. Determine the target ID to search for
    const targetId = type === "cookie" ? decrptText(id) : id;

    if (!targetId) {
      return res
        .status(400)
        .json(crs("Invalid or missing application identifier."));
    }

    // 3. Fetch the application from the database
    const application = await prisma.member.findFirst({
      where: {
        id: targetId,
        status: { in: ["applied", "rejected", "active"] },
      },
    });

    // 4. Handle the case where no application is found
    if (!application) {
      return res.status(404).json(crs.DATA_204_NOT_FOUND());
    }

    // 5. Send a success response with the application data
    return res
      .status(200)
      .json(crs.PUBLIC_200_APPLICATION_FETCHED(application));
  } catch (error) {
    createLog(error);
    return res
      .status(500)
      .json(
        crs("An unexpected error occurred while fetching the application.")
      );
  }
};
