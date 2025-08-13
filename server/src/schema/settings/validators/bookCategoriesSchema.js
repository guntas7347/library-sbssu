import z from "zod";

export const bookCategoriesSchema = z
  .array(
    // Each item in the array must be a string...
    z
      .string({
        invalid_type_error: "Each category must be a string.",
      })
      // ...that is not empty after trimming whitespace.
      .trim()
      .min(1, "Category name cannot be empty.")
  )
  // This check ensures all category names in the array are unique.
  .refine((items) => new Set(items).size === items.length, {
    message: "Duplicate category names are not allowed.",
  });
