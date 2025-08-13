import { z } from "zod";

// Defines the strict structure for the 'ISSUE-COMPATIBILITY' setting.
// It must be an object where keys are strings (the card types),
// and the values are nested objects.
export const issueCompatibilitySchema = z.record(
  z.string(),
  // The nested object must also have string keys (the book categories)
  // and boolean values (true or false).
  z.record(z.string(), z.boolean())
);
