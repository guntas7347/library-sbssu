import prisma from "../services/prisma.js";

export const getLatestMembershipId = async (tx = prisma) => {
  const member = await tx.member.findFirst({
    where: {
      membershipId: {
        not: null,
      },
    },
    orderBy: {
      membershipId: "desc",
    },
    select: {
      membershipId: true,
    },
  });

  return member ? member.membershipId : null;
};

export const getMembers = async (queryParam) => {
  const { name, value, page = 1 } = queryParam;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  let whereClause = {
    status: "active",
  };

  switch (name) {
    case "all":
      break;

    case "fullName":
      whereClause.fullName = {
        contains: value,
        mode: "insensitive",
      };
      break;

    default:
      whereClause[name] = value;
      break;
  }

  const totalCount = await prisma.member.count({
    where: whereClause,
  });

  const members = await prisma.member.findMany({
    where: whereClause,
    skip,
    take: pageSize,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return { data: members, totalPages };
};
