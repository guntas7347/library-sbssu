import { z } from "zod";
import { findQuerySchema } from "../common/findQuerySchema.js";

export const findApplicationSchema = findQuerySchema.merge(
  z.object({
    filter: z.enum(["all", "applicationId", "applied", "rejected"]).optional(),
  })
);
