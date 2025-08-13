import { z } from "zod";
import { findQuerySchema } from "../common/findQuerySchema.js";

export const findTransactionsSchema = findQuerySchema.merge(
  z.object({
    filter: z
      .enum(["all", "member", "receipt", "irn", "due", "acc", "card", "amount"])
      .optional(),
  })
);
