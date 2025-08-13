import z from "zod";

export const fetchSettingSchema = z.object({
  key: z.string().min(1, { message: "A setting key is required." }),
});
