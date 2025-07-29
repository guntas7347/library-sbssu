import { z } from "zod";

/**
 * Zod schema for validating the creation of a new transaction.
 */
export const CreateTransactionSchema = z.object({
  // The ID of the member this transaction belongs to.
  memberId: z.string().uuid({
    message: "A valid member ID is required.",
  }),

  // The type of transaction, restricted to either CREDIT or DEBIT.
  transactionType: z.enum(["CREDIT", "DEBIT"], {
    required_error: "Transaction type is required.",
    invalid_type_error: "Transaction type must be either 'CREDIT' or 'DEBIT'.",
  }),

  // The category of the transaction (e.g., late_fee, refund).
  category: z.string({ required_error: "Category is required." }).min(1, {
    message: "Category cannot be empty.",
  }),

  // The amount of the transaction. Coerced from string to number and must be positive.
  amount: z.coerce
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .positive({ message: "Amount must be greater than zero." }),

  // The method of payment.
  paymentMethod: z
    .string({ required_error: "Payment method is required." })
    .min(1, { message: "Payment method cannot be empty." }),

  // An optional receipt or reference number.
  receiptNumber: z.string().optional(),

  // An optional remark or note for the transaction.
  remark: z.string().optional(),
});
