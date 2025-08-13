import { z } from "zod";

export const issueSchema = z.object({
  cardNumber: z.string({
    required_error: "Card number is required",
    invalid_type_error: "Card number must be a string",
  }),
  accessionNumber: z.number({
    required_error: "Accession number is required",
    invalid_type_error: "Accession number must be a number",
  }),
  issueDuration: z
    .number({
      required_error: "Issue duration is required",
      invalid_type_error: "Issue duration must be a number",
    })
    .int({ message: "Issue duration must be an integer" })
    .positive({ message: "Issue duration must be a positive number" }),
  issueCondition: z
    .string({
      required_error: "Issue condition is required",
      invalid_type_error: "Issue condition must be a string",
    })
    .min(1, { message: "Issue condition cannot be empty" }),
  issueDate: z.coerce.date({
    invalid_type_error: "Issue date must be a valid date",
  }),
  issueRemark: z
    .string({ invalid_type_error: "Issue remark must be a string" })
    .optional(),
});
