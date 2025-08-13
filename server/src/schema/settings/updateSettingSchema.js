import z from "zod";

export const updateSettingSchema = z.object({
  key: z.string().min(1, { message: "Setting key is required." }),
  value: z.any(),
});
