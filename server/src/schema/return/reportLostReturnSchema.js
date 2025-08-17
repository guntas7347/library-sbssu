import { z } from "zod";

export const reportLostReturnSchema = z.object({
  // The UUID of the IssuedBook record being returned
  id: z.string().uuid({ message: "A valid issued book ID is required." }),

  // Optional remark on the book's condition upon return
  returnRemark: z.string().trim().optional(),
  fine: z
    .string()
    .trim()
    .nonempty("Fine is required")
    .transform((val) => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error("Fine must be a valid number");
      }
      return parseFloat(num.toFixed(2));
    })
    .refine((val) => val >= 0, {
      message: "Fine must be a positive number",
    }),
});
