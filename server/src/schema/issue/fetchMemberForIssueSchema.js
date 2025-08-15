import { z } from "zod";

export const fetchMemberForIssueSchema = z.object({
  search: z
    .string()
    .max(20, { message: "Search value must be at most 20 characters." })
    .nonempty({ message: "Search value is required." }),
});
