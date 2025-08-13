import { z } from "zod";

// A reusable schema for optional strings that can be null.
// It trims strings and converts empty strings "" to `null`.
const optionalNullableTrimmedString = z.preprocess(
  (val) => (val === "" ? null : val),
  z.string().trim().nullable().optional()
);

// Schema for an EXISTING accession being updated.
// All fields that can be cleared should be nullable.
const ExistingAccessionSchema = z.object({
  id: z.string().uuid(), // Required to know which accession to update
  accessionNumber: z.coerce.number().int(),
  condition: optionalNullableTrimmedString,
  status: z.string().optional(), // Status is managed by the system, so it's not nullable here
  category: optionalNullableTrimmedString,
});

// Schema for a NEW accession being created.
const NewAccessionSchema = z.object({
  accessionNumber: z.coerce.number().int(),
  condition: optionalNullableTrimmedString,
  category: optionalNullableTrimmedString,
});

// The main schema for the update payload.
export const updateBookSchema = z
  .object({
    id: z.string().uuid(),
    // --- Book Details ---
    title: z.string().trim().min(1, { message: "Book title is required." }),
    isbn: optionalNullableTrimmedString,
    author: optionalNullableTrimmedString,
    placeAndPublishers: optionalNullableTrimmedString,
    publicationYear: optionalNullableTrimmedString,
    edition: optionalNullableTrimmedString,
    pages: optionalNullableTrimmedString,
    volume: optionalNullableTrimmedString,
    description: optionalNullableTrimmedString,
    source: optionalNullableTrimmedString,
    location: optionalNullableTrimmedString,
    cost: optionalNullableTrimmedString,
    callNumber: optionalNullableTrimmedString,

    // Array of strings (tags) - can be optional and nullable.
    tags: z.array(z.string().trim()).optional().nullable(),

    // Array of existing accessions to update
    accessions: z.array(ExistingAccessionSchema).optional().nullable(),

    // Array of new accessions to create
    newAccessions: z.array(NewAccessionSchema).optional().nullable(),
  })
  .partial(); // .partial() makes all fields optional for the update
