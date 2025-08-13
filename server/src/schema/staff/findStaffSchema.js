import { z } from "zod";
import { findQuerySchema } from "../common/findQuerySchema.js";

export const findStaffSchema = findQuerySchema.merge(
  z.object({
    filter: z.enum(["all", "fullName", "idNumber"]).optional(),
  })
);
