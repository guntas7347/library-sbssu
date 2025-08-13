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
  // The unique code from the reset link, used to identify the user.
  code: z.string().uuid("A valid reset code is required."),

  // The new password the user wants to set.
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),

  // The 6-digit 2FA token to verify the user's identity.
  totp: z.string().regex(/^\d{6}$/, "TOTP must be exactly 6 digits"),
});
export const verifyResetLinkSchema = z.object({
  code: z.string().uuid("A valid reset code is required."),
});
