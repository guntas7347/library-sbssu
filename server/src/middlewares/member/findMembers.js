import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches paginated member records with optional filtering by name or membership ID.
 *
 * @async
 * @function findMembersHandler
 * @param {import("express").Request} req - Express request (expects validatedQuery with `page`, `limit`, `filter`, `value`)
 * @param {import("express").Response} res - Express response
 * @returns {Promise<void>}
 */
export const findMembersHandler = async (req, res) => {
  try {
    const { page, limit, filter, value } = req.validatedQuery;

    const skip = (page - 1) * limit;

    const where = {};

    switch (filter) {
      case "all":
        where.AND = [{ status: "active" }];
        break;

      case "fullName":
        where.AND = [
          { status: "active" },
          {
            fullName: {
              contains: value.trim(),
              mode: "insensitive",
            },
          },
        ];
        break;

      case "membershipId":
        where.AND = [
          { status: "active" },
          {
            membershipId: {
              contains: value.trim(),
              mode: "insensitive",
            },
          },
        ];
        break;

      case "cleared":
        where.AND = [{ status: "cleared" }];
        break;

      default:
        return res.status(400).json(crs(`Invalid filter: "${filter}"`));
    }

    const totalCount = await prisma.member.count({ where });

    const members = await prisma.member.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        photo: true,
        fullName: true,
        gender: true,
        email: true,
        membershipId: true,
        rollNumber: true,
        program: true,
        batch: true,
        specialization: true,
        memberType: true,
        balance: true,
        status: true,
        _count: {
          select: {
            libraryCards: true,
          },
        },
      },
      orderBy: {
        fullName: "asc",
      },
    });

    const formattedMembers = members.map((member) => ({
      ...member,
      booksIssued: member._count.libraryCards,
      fineAmount: member.balance,
    }));

    const totalPages = Math.ceil(totalCount / limit);

    if (totalPages === 0)
      return res
        .status(404)
        .json(crs("No members found matching your criteria."));

    const response = {
      data: formattedMembers,
      totalPages,
    };

    return res.status(200).json(crs.MEMBER_200_ALL_FETCHED(response));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
