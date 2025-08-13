import { z } from "zod";

// Define the statuses that a staff member is allowed to set manually.
// 'issued' and 'blocked' are managed by other system processes (issuing, returning, etc.).
const allowedStatuses = z.enum(["available", "blocked", "frozen"]);

export const updateCardStatusSchema = z.object({
  id: z.string().uuid({ message: "A valid card ID is required." }),
  status: allowedStatuses,
});
