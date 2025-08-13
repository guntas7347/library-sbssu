import { z } from "zod";

// Defines the strict structure for the 'ISSUE-DURATION' setting.
export const issueDurationSchema = z
  .array(
    z.coerce
      .number({
        invalid_type_error: "Each duration must be a valid number.",
      })
      .int("Each duration must be a whole number.")
      .positive("Each duration must be a positive number (e.g., 7, 14).")
  )
  .min(1, "At least one issue duration must be provided.")
  .refine((items) => new Set(items).size === items.length, {
    // This check ensures all numbers in the array are unique.
    message: "Duplicate issue durations are not allowed.",
  });
