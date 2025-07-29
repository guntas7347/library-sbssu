import prisma from "../../services/prisma.js";
import { getLCAAL } from "../libraryCards/cards.controller.js";

/**
 * Fetches the complete details for a single membership application.
 *
 * @param {string} applicationId - The ID of the application (which is the member's ID).
 * @returns {Promise<object|false>} A structured object with applicant details and their potential card allotment, or false if not found.
 */
export const fetchApplicationDetails = async (applicationId) => {
  try {
    // 1. Fetch the applicant's complete record from the Member table.
    const applicant = await prisma.member.findUnique({
      where: { id: applicationId },
      select: {
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

    // If no applicant is found with the given ID, return false.
    if (!applicant) {
      return false;
    }

    // 2. Calculate the number of cards to be allotted based on the applicant's memberType.
    // This assumes getLCAAL can be called outside a transaction.
    const { cardLimit } = await getLCAAL(applicant.memberType);

    // 3. Assemble the final data object for the frontend.
    const applicationDetails = {
      // Spread all fetched applicant data
      ...applicant,
      cardLimit: cardLimit || 0, // Default to 0 if not found
    };

    return applicationDetails;
  } catch (error) {
    console.error("Error fetching application details:", error);
    // Re-throw the error to be handled by the route's error handler.
    throw error;
  }
};
