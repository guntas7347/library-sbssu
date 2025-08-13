import { z } from "zod";

export const findQuerySchema = z.object({
  page: z.coerce
    .number({ invalid_type_error: "Page must be a number." })
    .int()
    .positive("Page must be a positive number.")
    .default(1),

  limit: z.coerce
    .number({ invalid_type_error: "Limit must be a number." })
    .int()
    .positive()
    .max(100, "Limit cannot exceed 100.")
    .default(25),
  value: z.string().trim().optional(),
});
