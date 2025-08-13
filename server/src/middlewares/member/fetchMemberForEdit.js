import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches the specific fields of a member required for the edit form.
 */
export const fetchMemberForEditHandler = async (req, res) => {
  try {
    const { id } = req.validatedQuery;

    const member = await prisma.member.findUnique({
      where: { id },
      // Select only the fields needed by the MemberInfoForm
      select: {
        fullName: true,
        fatherName: true,
        email: true,
        phoneNumber: true,
        dob: true,
        cast: true,
        rollNumber: true,
        memberType: true,
        program: true,
        specialization: true,
        batch: true,
        city: true,
        streetAddress: true,
        pinCode: true,
        state: true,
      },
    });

    if (!member) {
      return res.status(404).json(crs("Member not found."));
    }

    // Use a generic success code for fetching data
    return res.status(200).json(crs.MEMBER_200_FETCHED(member));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
