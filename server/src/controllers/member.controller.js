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

  const where = {};

  switch (name) {
    case "all":
      where.AND = [{ status: "active" }];
      break;

    case "fullName":
      where.AND = [
        {
          fullName: {
            contains: value,
            mode: "insensitive",
          },
        },
      ];
      break;

    case "membershipId":
      where.AND = [
        {
          membershipId: {
            contains: value,
            mode: "insensitive",
          },
        },
      ];
      break;

    default:
      break;
  }

  const totalCount = await prisma.member.count({ where });

  const members = await prisma.member.findMany({
    where,
    skip,
    take: pageSize,
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
  });

  // Format result to match frontend expectation
  const formattedMembers = members.map((member) => ({
    ...member,
    booksIssued: member._count.libraryCards, // renamed for frontend column
    fineAmount: member.balance, // alias for balance
  }));

  const totalPages = Math.ceil(totalCount / pageSize);

  return { data: formattedMembers, totalPages };
};
