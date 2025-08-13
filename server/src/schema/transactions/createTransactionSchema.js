import { z } from "zod";

export const createTransactionSchema = z.object({
  // The ID of the member this transaction belongs to
  memberId: z.string().uuid({ message: "A valid member ID is required." }),

  // The type of transaction
  transactionType: z.enum(["DEBIT", "CREDIT"], {
    required_error: "Transaction type (DEBIT or CREDIT) is required.",
  }),

  // The amount of the transaction
  amount: z.coerce
    .number({ required_error: "Amount is required." })
    .positive({ message: "Amount must be a positive number." }),

  // The category of the transaction (e.g., 'manual_credit', 'membership_fee')
  category: z.string().min(1, { message: "Category is required." }),

  // The payment method used
  paymentMethod: z.string().min(1, { message: "Payment method is required." }),

  // Optional fields
  receiptNumber: z.string().optional(),
  remark: z.string().optional(),
});
