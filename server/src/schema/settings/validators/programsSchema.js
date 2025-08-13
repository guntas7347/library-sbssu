import { z } from "zod";

// Defines the structure for a single specialization
const specializationSchema = z.object({
  name: z.string().trim().min(1, "Specialization name is required."),
});

// Defines the structure for a single program
const programSchema = z.object({
  name: z.string().trim().min(1, "Program name is required."),
  duration: z.number().int().positive("Duration must be a positive number."),
  specialization: z
    .array(specializationSchema)
    .superRefine((specializations, ctx) => {
      const seen = new Set();
      for (let i = 0; i < specializations.length; i++) {
        const specName = specializations[i].name.toLowerCase();
        if (seen.has(specName)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Specialization "${specializations[i].name}" is duplicated.`,
            path: [i, "name"],
          });
        }
        seen.add(specName);
      }
    }),
});

// Defines the final structure for the entire 'PROGRAMS' setting value
export const programsSchema = z
  .array(programSchema)
  .superRefine((programs, ctx) => {
    const seenPrograms = new Set();
    for (let i = 0; i < programs.length; i++) {
      const programName = programs[i].name.toLowerCase();
      if (seenPrograms.has(programName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Program "${programs[i].name}" is duplicated.`,
          path: [i, "name"],
        });
      }
      seenPrograms.add(programName);
    }
  });
