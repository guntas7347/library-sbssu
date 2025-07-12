import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .max(25, "Username must be at most 25 characters")
    .nonempty("Username is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),

  totp: z.string().regex(/^\d{6}$/, "TOTP must be exactly 6 digits"),

  fingerprint: z.string(),
});

export const forgotPasswordSchema = z.object({
  username: z
    .string()
    .max(25, "Username must be at most 25 characters")
    .nonempty("Username is required"),

  url: z.string(),
});

export const resetPasswordSchema = z.object({
  password: z.string(),
  totp: z.string(),
});
