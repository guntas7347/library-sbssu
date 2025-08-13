import { z } from "zod";

export const returnBookSchema = z.object({
  // The UUID of the IssuedBook record being returned
  id: z.string().uuid({ message: "A valid issued book ID is required." }),

  // Optional remark on the book's condition upon return
  returnRemark: z.string().trim().optional(),
});
