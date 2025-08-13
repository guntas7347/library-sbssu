import { z } from "zod";
import { findQuerySchema } from "../common/findQuerySchema.js";

export const findReturnsSchema = findQuerySchema.merge(
  z.object({
    filter: z.enum(["all", "irn", "due", "acc", "card"]).optional(),
  })
);
