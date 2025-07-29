import { z } from "zod";

export const IssueSchema = z.object({
  cardNumber: z.string(),
  accessionNumber: z.number(),
  issueDuration: z.number().int().positive(),
  issueCondition: z.string().min(1),
  issueDate: z.coerce.date(),
  issueRemark: z.string().optional(),
});
