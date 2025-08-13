import z from "zod";

const searchSchema = z.object({
  searchTerm: z.string().trim(),
});

export default searchSchema;
