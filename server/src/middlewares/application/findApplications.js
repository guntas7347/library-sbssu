import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Retrieves paginated and filtered application records.
 *
 * @async
 * @function findApplicationsHandler
 * @param {import("express").Request} req - Express request (expects validatedQuery with `page`, `limit`, `filter`, and optional `value`).
 * @param {import("express").Response} res - Express response.
 * @returns {Promise<void>} - Returns paginated list of applications or an error message.
 */
export const findApplicationsHandler = async (req, res) => {
  try {
    const { page, limit, filter, value } = req.validatedQuery || {};

    const pageSize = parseInt(limit, 10);
    const skip = (parseInt(page, 10) - 1) * pageSize;

    const where = {};

    // Handle status filtering
    switch (filter) {
      case "all":
        where.status = { in: ["applied", "rejected"] };
        break;

      case "applied":
        where.status = "applied";
        break;

      case "rejected":
        where.status = "rejected";
        break;

      case "applicationId":
        where.applicationId = {
          contains: value.trim(),
          mode: "insensitive",
        };

        break;

      default:
        return res.status(400).json(crs(`Invalid filter value: "${filter}"`));
    }

    // Fetch data using Prisma transaction
    const [totalCount, applications] = await prisma.$transaction([
      prisma.member.count({ where }),
      prisma.member.findMany({
        where,
        take: pageSize,
        skip,
        select: {
          id: true,
          fullName: true,
          gender: true,
          photo: true,
          email: true,
          applicationId: true,
          program: true,
          specialization: true,
          batch: true,
          memberType: true,
          status: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    if (totalCount === 0) {
      return res.status(404).json(crs("No applications found."));
    }

    const totalPages = Math.ceil(totalCount / pageSize);

    const response = {
      data: applications,
      totalPages,
    };

    return res.status(200).json(crs.APPLICATION_200_SEARCHED(response));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
