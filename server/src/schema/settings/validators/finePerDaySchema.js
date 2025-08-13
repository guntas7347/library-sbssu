import { z } from "zod";

// Defines the strict structure for the 'FINE-PER-DAY' setting.
// It must be an object where keys are strings (the member types)
// and values are numbers that are not negative.
export const finePerDaySchema = z.record(
  z.string(),
  z.coerce
    .number({
      invalid_type_error: "Fine amount must be a number.",
    })
    .min(0, "Fine amount cannot be negative.")
);
