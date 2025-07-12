import { Prisma } from "@prisma/client";

const handlePrismaError = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return `Duplicate field value: ${error.meta?.target}`;
      case "P2025":
        return `The requested record was not found.`;
      default:
        return `Prisma error: ${error.message}`;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return `Validation failed: ${error.message}`;
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return `Unknown Prisma request error: ${error.message}`;
  } else if (error instanceof Error) {
    return `General error: ${error.message}`;
  } else {
    return `An unexpected error occurred.`;
  }
};

export const createLog = (e) => {
  // console.log(e);
  console.log(handlePrismaError(e));
};
