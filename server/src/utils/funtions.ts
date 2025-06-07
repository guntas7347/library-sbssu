import { Prisma } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import QRCode from "qrcode";

const handlePrismaError = (error: PrismaClientInitializationError) => {
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
    // Extract file name and line number from stack trace
    const stackLines = error.stack?.split("\n");
    let locationInfo = "";
    if (stackLines && stackLines.length > 1) {
      // The first stack line after the message usually contains the location
      const match = stackLines[1].match(/\((.*):(\d+):(\d+)\)/);
      if (match) {
        const [file, line, column] = match;
        const fily = file.split("\\");
        const add = fily[fily.length - 1];
        locationInfo = ` (at ${add})`;
      }
    }
    return `Error: ${error.message}${locationInfo}`;
  } else {
    return `An unexpected error occurred.`;
  }
};

export const createLog = (e: any) => {
  console.log(handlePrismaError(e));
};

export const uuid = (length = 1) => {
  let uuid = "";
  for (let index = 0; index < length; index++) {
    uuid = uuid + randomUUID();
  }
  return uuid.replace(/-/g, "");
};

export const createQR = async (data: string) => await QRCode.toDataURL(data);
