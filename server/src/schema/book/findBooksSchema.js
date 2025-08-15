import { z } from "zod";
import { findQuerySchema } from "../common/findQuerySchema.js";

export const findBooksSchema = findQuerySchema.merge(
  z.object({
    filter: z.enum(["all", "title", "accession", "category"]).optional(),
  })
);
