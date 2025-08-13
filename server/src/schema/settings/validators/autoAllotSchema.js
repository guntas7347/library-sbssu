import { z } from "zod";

// Defines the strict structure for the 'LIBRARY-CARD-AUTO-ALLOT-LIMIT' setting.
export const autoAllotSchema = z.object({
  // The card type must be a non-empty string.
  type: z.string().trim().min(1, "A card type must be selected."),

  // The 'limits' must be an object where keys are strings (member types)
  // and values are numbers that are not negative.
  limits: z.record(
    z.string(),
    z.coerce
      .number({ invalid_type_error: "Limit must be a number." })
      .int()
      .min(0, "Limit cannot be negative.")
  ),
});
