import { z } from "zod";

// A reusable schema for optional strings that are automatically trimmed.
// It also converts any empty string "" to `undefined`, so it won't be saved to the database.
const optionalTrimmedString = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z
    .string({
      invalid_type_error: "Invalid input: expected a string.",
    })
    .trim()
    .optional()
);

// Schema for a single book accession, with trimming applied.
const AccessionSchema = z.object({
  accessionNumber: z.coerce
    .number({ required_error: "Accession number is required." })
    .int(),
  condition: optionalTrimmedString,
  category: optionalTrimmedString,
});

// The main BookSchema, now with automatic trimming for all string fields.
export const BookSchema = z.object({
  // --- Book Details ---

  // Required title: must not be empty after trimming.
  title: z.string().trim().min(1, { message: "Book title is required." }),

  // All other string fields are optional and will be trimmed.
  isbn: optionalTrimmedString,
  author: optionalTrimmedString,
  placeAndPublishers: optionalTrimmedString,
  publicationYear: optionalTrimmedString,
  edition: optionalTrimmedString,
  pages: optionalTrimmedString,
  volume: optionalTrimmedString,
  description: optionalTrimmedString,
  source: optionalTrimmedString,
  location: optionalTrimmedString,
  cost: optionalTrimmedString,
  callNumber: optionalTrimmedString,

  // Array of strings (tags) - we can trim each tag individually.
  tags: z.array(z.string().trim()).optional(),

  // --- Accession Details ---
  accessions: z
    .array(AccessionSchema)
    .min(1, { message: "At least one accession is required." }),
});
