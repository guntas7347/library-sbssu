import { z } from "zod";
import { findQuerySchema } from "../common/findQuerySchema.js";

export const findMembersSchema = findQuerySchema.merge(
  z.object({
    filter: z.enum(["all", "fullName", "membershipId", "cleared"]).optional(),
  })
);
