import prisma from "../services/prisma.js";

export const findApplications = async (filter) => {
  const { name, value } = filter;

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const where = {
    OR: [
      { status: "applied" },
      {
        AND: [
          { status: { in: ["active", "rejected"] } },
          { createdAt: { gte: oneMonthAgo } },
        ],
      },
    ],
  };

  if (name === "applicationId") {
    // Wrap in AND to combine with existing filter logic
    where.AND = [{ applicationId: value }];
  }

  const applications = await prisma.member.findMany({
    where,
    select: {
      id: true,
      fullName: true,
      email: true,
      applicationId: true,
      program: true,
      specialization: true,
      memberType: true,
      createdAt: true,
      status: true,
      gender: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return applications;
};
