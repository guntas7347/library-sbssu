import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches a member's details for the book issuance process.
 */
export const fetchMemberForIssueHandler = async (req, res) => {
  try {
    // Data is validated by the Zod middleware
    const { number } = req.validatedQuery;

    const formattedNumber = `${number.slice(0, 2)}-${number.slice(2)}`;

    // Construct the full membershipId
    const membershipId = `MEM-${formattedNumber}`;

    const member = await prisma.member.findFirst({
      where: { membershipId },
      select: {
        id: true,
        fullName: true,
        photo: true,
        program: true,
        specialization: true,
        email: true,
        membershipId: true,
        memberType: true,
        libraryCards: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            cardNumber: true,
            status: true,
            expiry: true,
            type: true,
            remark: true,
          },
        },
      },
    });

    if (!member) {
      return res.status(404).json(crs("Member with that ID was not found."));
    }

    return res.status(200).json(crs.ISSUE_200_MEMBER_FETCHED(member));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
