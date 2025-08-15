import { z } from "zod";

export const catalogueSearchSchema = z.object({
  search: z.string().trim().max(25),
});
