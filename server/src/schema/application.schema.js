import z from "zod";

export const applicationSchema = z.object({
  rollNumber: z.coerce.number(),
  fullName: z.string().trim().min(1, "Full name is required"),
  fatherName: z.string().trim().min(1, "Father's name is required"),
  photo: z.string().min(1, "Photo is required"),
  cast: z.enum(["general", "sc_st", "other"]).default("general"),
  gender: z.enum(["male", "female", "other"]).default("male"),
  dob: z.coerce.date({ required_error: "Date of birth is required" }),
  program: z.string().min(1, "Program is required"),
  specialization: z.string().min(1, "Specialization is required"),
  batch: z.coerce.number({ required_error: "Batch is required" }),
  email: z
    .string()
    .trim()
    .regex(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please enter a valid email address"
    ),
  phoneNumber: z.string().min(1, "Phone number is required"),
  memberType: z.string(),
  subscribeToUpdates: z.boolean(),
  streetAddress: z.string().trim().min(1, "Street address is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  pinCode: z.string().trim().min(5, "PIN code must be at least 5 digits"),
});

export const decisionSchema = z.object({
  id: z.string().uuid(),
  decision: z.enum(["approve", "reject"]),
});
