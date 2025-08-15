import { z } from "zod";

export const decisionSchema = z.object({
  id: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .uuid({ message: "Invalid ID format — must be a valid UUID" }),

  decision: z.enum(["approve", "reject"], {
    required_error: "Decision is required",
    invalid_type_error: "Decision must be either 'approve' or 'reject'",
  }),
});
