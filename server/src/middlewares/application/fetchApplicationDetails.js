import prisma from "../../services/prisma.js";
import { getLCAAL } from "../../controllers/libraryCards/cards.controller.js";
import { createLog } from "../../utils/log.js";
import crs from "../../utils/crs/crs.js";

/**
 * Fetches detailed application data for a given member.
 *
 * @async
 * @function fetchApplicationHandler
 * @param {import("express").Request} req - Express request object (expects validatedQuery with an `id` field).
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} JSON response with application data or error message.
 */

export const fetchApplicationHandler = async (req, res) => {
  try {
    const { id } = req.validatedQuery;

    // 1. Fetch the applicant's complete record from the Member table.
    const applicant = await prisma.member.findUnique({
      where: { id },
      select: {
        applicationId: true,
        id: true,
        fullName: true,
        photo: true,
        program: true,
        specialization: true,
        email: true,
        phoneNumber: true,
        dob: true,
        streetAddress: true,
        city: true,
        cast: true,
        fatherName: true,
        rollNumber: true,
        memberType: true,
        batch: true,
        status: true,
      },
    });

    // If no applicant is found with the given ID
    if (!applicant) {
      return res
        .status(404)
        .json(crs("No application found with the provided ID."));
    }

    // 2. Determine how many cards to allot based on member type
    const { cardLimit } = await getLCAAL(applicant.memberType);

    // 3. Assemble the final data object for the frontend
    const applicationDetails = {
      ...applicant,
      cardLimit: cardLimit || 0,
    };

    // Send the successful response
    return res
      .status(200)
      .json(crs.APPLICATION_200_FETCHED(applicationDetails));
  } catch (error) {
    // Log and respond to internal server error
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
