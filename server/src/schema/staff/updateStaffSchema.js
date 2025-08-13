import { z } from "zod";

export const updateStaffSchema = z.object({
  // Auth model fields
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .refine((val) => !val.toLowerCase().startsWith("mem"), {
      message: "Username cannot start with 'MEM'.",
    })
    .optional(),
  email: z.string().email("Invalid email address.").optional(),
  rights: z.array(z.string()).optional(),
  id: z.string().uuid("Invalid ID"),

  // Staff model fields
  fullName: z.string().min(1, "Full name is required.").optional(),
  phoneNumber: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date().optional().nullable(),
  gender: z.string().optional().nullable(),
  employeeId: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  joiningDate: z.coerce.date().optional().nullable(),
  employmentStatus: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  emergencyContact: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
});
