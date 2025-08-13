import { z } from "zod";

export const AllotCardSchema = z.object({
  memberId: z.string().uuid({ message: "A valid member ID is required." }),
  cardNumber: z.string().regex(/^CRD-\d{2}-\d{4}-(0[1-9]|[1-9][0-9])$/, {
    message: "Card number must match the format like CRD-25-0001-01.",
  }),
  expiryDate: z.coerce.date({ required_error: "Expiry date is required." }),
  cardType: z.string().min(1, { message: "Card type is required." }),
  remark: z.string().optional(),
});
