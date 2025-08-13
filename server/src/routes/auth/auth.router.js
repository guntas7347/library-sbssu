import { Router } from "express";
import validate from "../../middlewares/validateRequest.js";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  verifyResetLinkSchema,
} from "../../schema/auth.schema.js";
import {
  createFingerprint,
  setJwtCookie,
  verifyFingerprint,
  verifyJwtMiddleware,
} from "../../middlewares/auth/auth.middlewares.js";
import { authenticateUser } from "../../middlewares/auth/authenticateUser.js";
import { handleForgotPassword } from "../../middlewares/auth/forgotPassword.js";
import { handleVerifyResetLink } from "../../middlewares/auth/verifyResetLink.js";
import { handleResetPassword } from "../../middlewares/auth/resetPassword.js";
import { handleUserPing } from "../../middlewares/auth/ping.js";
import { handleSignOut } from "../../middlewares/auth/signOut.js";
import { handleClearSession } from "../../middlewares/auth/clearSession.js";

const authRouter = new Router();

authRouter.post(
  "/login",
  validate(loginSchema),
  authenticateUser,
  setJwtCookie,
  createFingerprint
); //login

authRouter.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  handleForgotPassword
); // forgot-password

authRouter.post(
  "/verify-reset-link",
  validate(verifyResetLinkSchema),
  handleVerifyResetLink
); //verify-reset-link

authRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  handleResetPassword
); //reset-password

authRouter.post(
  "/ping",
  verifyJwtMiddleware,
  verifyFingerprint,
  handleUserPing
);

authRouter.get("/sign-out", verifyJwtMiddleware, handleSignOut);

authRouter.get("/clear-session", handleClearSession);

export default authRouter;
