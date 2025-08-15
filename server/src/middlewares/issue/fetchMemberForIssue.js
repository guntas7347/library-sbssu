import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches a member's details for the book issuance process.
 */
export const fetchMemberForIssueHandler = async (req, res) => {
  try {
    // Data is validated by the Zod middleware
    const { search } = req.validatedQuery;

    function formatMembershipId(input) {
      if (/^\d+$/.test(input)) {
        const prefix = input.slice(0, input.length - 4);
        const suffix = input.slice(-4);
        return `MEM-${prefix}-${suffix}`;
      }
      return input;
    }

    const formattedId = formatMembershipId(search);

    const member = await prisma.member.findFirst({
      where: {
        OR: [
          { membershipId: formattedId }, // if stored as int
          { fullName: { contains: search, mode: "insensitive" } }, // only string field
          { phoneNumber: { contains: search, mode: "insensitive" } },
          { rollNumber: { contains: search, mode: "insensitive" } },
        ],
      },
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
