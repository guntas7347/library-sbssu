import z from "zod";

export const applicationSchema = z.object({
  rollNumber: z.coerce.number(),
  fullName: z.string().min(1, "Full name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  category: z.enum(["general", "sc_st", "other"]).default("general"),
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
  memberType: z
    .enum([
      "student_ug",
      "student_pg",
      "teacher_regular",
      "teacher_adhoc",
      "non_teaching_staff",
      "special_member",
    ])
    .default("STUDENT UG"),
  subscribeToUpdates: z.boolean(),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pinCode: z.string().min(5, "PIN code must be at least 5 digits"),
});
