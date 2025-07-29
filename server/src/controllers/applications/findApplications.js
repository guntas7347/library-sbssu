import prisma from "../../services/prisma.js";

/**
 * Fetches a paginated list of membership applications.
 *
 * @param {object} queryParam - The query parameters for filtering and pagination.
 * @returns {Promise<{data: object[], totalPages: number}|false>} An object with data and total pages, or false if no data is found.
 */

export const findApplications = async (queryParam) => {
  const { name, value, page = 1 } = queryParam || {};
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  let where = {
    status: {
      in: ["applied", "rejected"],
    },
  };

  switch (name) {
    case "applicationId":
      if (value) {
        where.applicationId = {
          contains: value,
          mode: "insensitive",
        };
      }
      break;
    case "applied":
      where.status = "applied";
      break;
    case "rejected":
      where.status = "rejected";
      break;
  }

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

  // If no records are found, return false as requested.
  if (totalCount === 0) {
    return false;
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: applications,
    totalPages,
  };
};
