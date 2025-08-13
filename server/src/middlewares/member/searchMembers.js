import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Searches for active members by full name or membership ID.
 *
 * @async
 * @function searchMembersHandler
 * @param {import("express").Request} req - Express request (expects validatedQuery with `searchTerm`)
 * @param {import("express").Response} res - Express response
 * @returns {Promise<void>}
 */
export const searchMembersHandler = async (req, res) => {
  try {
    const { searchTerm } = req.validatedQuery;

    const members = await prisma.member.findMany({
      where: {
        status: "active",
        OR: [
          {
            fullName: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            membershipId: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        fullName: true,
        membershipId: true,
        photo: true,
        program: true,
        balance: true,
      },
      take: 10,
    });

    if (members.length === 0) {
      return res.status(404).json(crs("No matching members found."));
    }

    return res.status(200).json(crs.MEMBER_200_ALL_FETCHED(members));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
