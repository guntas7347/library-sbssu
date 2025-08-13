import { z } from "zod";

export const fetchApplicationSchema = z.object({
  type: z.string(),
  id: z.string(),
});
