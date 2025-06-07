import { z, ZodError } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { createLog } from "../../utils/funtions";
import { crs } from "../../utils/custom-response-codes";

// 1. Schemas
export const objectIdSchema = z.string().uuid();

export const strongPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
      }
    ),
});

export const loginCredsSchema = z.object({
  userName: z.string().nonempty({ message: "username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  totp: z.string().min(1, { message: "TOTP is required" }),
});

export const usernameUrlSchema = z.object({
  userName: z.string().nonempty({ message: "username is required" }),
  url: z.string().nonempty({ message: "url is required" }),
});

// 2. Middleware wrappers
const zodValidate = (schema: z.ZodTypeAny) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      schema.parse(req.body);
      return;
    } catch (error) {
      createLog(error);
      if (error instanceof ZodError) {
        const firstError = error.errors[0]?.message || "Invalid input";
        return reply.status(400).send(crs.VAL400FAIL(firstError));
      }
      return reply.status(500).send(crs.SERR500REST(error));
    }
  };
};

// 3. Export middlewares

export const validateObjectId = zodValidate(objectIdSchema);
export const zod_passwordStrength = zodValidate(strongPasswordSchema);
export const zod_loginCreds = zodValidate(loginCredsSchema);
export const zod_username = zodValidate(usernameUrlSchema);
