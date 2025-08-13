import { z } from "zod";

export const fetchBookForIssueSchema = z.object({
  number: z.coerce
    .number({
      required_error: "Accession number is required.",
      invalid_type_error: "Accession number must be a number.",
    })
    .int()
    .positive("Accession number must be a positive number."),
});
