import { z } from "zod";

export const deleteApplicationSchema = z.object({
  gh: z.string().min(1, { message: "Original device is required." }),
});
