import { z } from "zod";

export const createStaffSchema = z.object({
  // Required fields for creating the staff and auth records
  fullName: z.string().min(1, { message: "Full name is required." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "A valid email address is required." }),
  idNumber: z
    .string()
    .regex(/^\d+$/, { message: "A valid ID number is required." }),

  // Optional fields
  rights: z.array(z.string()).optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  employeeId: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  joiningDate: z.coerce.date().optional(),
  employmentStatus: z.string().optional(),
  photo: z.string().url().optional(),
});
