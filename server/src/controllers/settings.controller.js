import prisma from "../services/prisma.js";

export const fetchSettings = async (key) => {
  return await prisma.setting.findUnique({ where: { key } });
};
