import { z } from "zod";

// A reusable schema for optional strings that are automatically trimmed and can be null.
const optionalNullableTrimmedString = z.preprocess(
  (val) => (val === "" ? null : val),
  z.string().trim().nullable().optional()
);

export const updateMemberSchema = z.object({
  id: z.string().uuid("Invalid ID"),

  // Personal Info
  fullName: z.string().trim().min(1, "Full name is required."),
  fatherName: z.string().trim().min(1, "Father's name is required."),
  email: z.string().email("A valid email is required."),
  phoneNumber: optionalNullableTrimmedString,
  dob: z.coerce.date().optional().nullable(),
  cast: z.string().optional(),

  // Academic Info
  rollNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, {
      message: "Roll number must be numeric",
    })
    .optional(),
  memberType: z.string().optional(),
  program: optionalNullableTrimmedString,
  specialization: optionalNullableTrimmedString,
  batch: z
    .string()
    .trim()
    .regex(/^\d+$/, {
      message: "Batch must be numeric",
    })
    .optional(),

  // Address Info
  city: optionalNullableTrimmedString,
  streetAddress: optionalNullableTrimmedString,
});
