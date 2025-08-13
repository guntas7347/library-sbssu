import { z } from "zod";

export const fetchMemberForIssueSchema = z.object({
  number: z.string().regex(/^\d{6}$/, {
    message: "Membership ID must be a 6-digit number.",
  }),
});
