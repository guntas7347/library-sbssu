import { z } from "zod";

export const createTransactionSchema = z
  .object({
    // The ID of the member this transaction belongs to
    memberId: z.string().uuid({ message: "A valid member ID is required." }),

    // The type of transaction
    transactionType: z.enum(["DEBIT", "CREDIT"], {
      required_error: "Transaction type (DEBIT or CREDIT) is required.",
    }),

    // The amount of the transaction (positive integer only)
    amount: z.coerce
      .number({ required_error: "Amount is required." })
      .int({ message: "Amount must be an integer." })
      .positive({ message: "Amount must be a positive number." }),

    // The category of the transaction
    category: z.string().min(1, { message: "Category is required." }),

    // The payment method used
    paymentMethod: z
      .string()
      .min(1, { message: "Payment method is required." }),

    // Optional fields (receiptNumber will be conditionally required later)
    receiptNumber: z.string().optional(),
    remark: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.transactionType === "CREDIT") {
        return !!data.receiptNumber?.trim();
      }
      return true;
    },
    {
      message: "Receipt number is required for CREDIT transactions.",
      path: ["receiptNumber"],
    }
  );
