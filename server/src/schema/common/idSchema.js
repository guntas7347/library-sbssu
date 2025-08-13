import z from "zod";

const idSchema = z.object({
  id: z.string().uuid("Invalid ID"),
});

export default idSchema;
