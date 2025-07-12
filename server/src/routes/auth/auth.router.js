import { Router } from "express";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import validateRequest from "../../middlewares/validate-request.js";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from "../../schema/auth.schema.js";
import {
  create2FA,
  createLink,
  fetchAuthUserByUserName,
  populate2FaSecret,
  processLink,
  setJwtCookie,
  verify2FA,
  verifyPassword,
  verifyResetLink,
  verifyUsernameForLogin,
} from "./auth.middlewares.js";
// import { createStaffInternal } from "../staff/staff/staff.router.js";
import prisma from "../../services/prisma.js";
import { hashPassword } from "../../utils/bycrypt.js";
import {
  createFingerprint,
  verifyFingerprint,
  verifyJwtMiddleware,
} from "../../middlewares/auth.middlewares.js";

const authRouter = new Router();

authRouter.get("/clear-session", async (req, res) => {
  try {
    res.cookie("session", null, { expires: new Date(0) });
    return res.status(200).json(crs.AUTH_200_SESSION_CLEARED());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
});

authRouter.post(
  "/login",
  validateRequest(loginSchema),
  verifyUsernameForLogin,
  verifyPassword,
  verify2FA,
  setJwtCookie,
  createFingerprint,
  async (req, res) => {
    try {
      return res
        .status(200)
        .json(crs.AUTH_200_LOGIN_SUCCESS(req.context.userType));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); //login

authRouter.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  fetchAuthUserByUserName,
  createLink,
  processLink,
  // sendVerificationEmail,
  async (req, res) => {
    try {
      console.log(req.context.link);
      return res.status(200).json(crs.AUTH_200_PASSWORD_RESET_SENT());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); // forgot-password

authRouter.post(
  "/verify-reset-link",
  verifyResetLink,
  create2FA,
  async (req, res) => {
    try {
      const auth = await prisma.auth.findFirst({
        where: { resetCode: req.body.code },
      });
      if (auth)
        await prisma.auth.update({
          where: { id: auth.id },
          data: { twoFaSecret: req.context.base32 },
        });

      const d = {
        base32: req.context.base32,
        otpauth_url: req.context.otpauth_url,
        resetCodeTime: req.context.resetCodeTime,
      };

      return res.status(200).json(crs.AUTH_200_LINK_VERIFIED(d));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); //verify-reset-link

authRouter.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  populate2FaSecret,
  verify2FA,
  async (req, res) => {
    try {
      const password = await hashPassword(req.vBody.password);
      await prisma.auth.update({
        where: { id: req.context.authDocId },
        data: {
          password,
          resetCode: crypto.randomUUID(),
        },
      });

      return res.status(200).json(crs.AUTH_200_PASSWORD_RESET_SUCCESS());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); //reset-password

authRouter.post(
  "/ping",
  verifyJwtMiddleware,
  verifyFingerprint,
  async (req, res) => {
    try {
      const userType = req.body.userType;
      const authDoc = await prisma.auth.findUnique({
        where: { id: req.user.uid },
        select: {
          username: true,
          email: true,
          role: true,
          active: true,
          userType: true,
          staff: { select: { fullName: true, imageUrl: true } },
          member: { select: { fullName: true, imageUrl: true } },
        },
      });

      if (!authDoc || !authDoc.active || userType !== authDoc.userType) {
        res.cookie("session", null, { expires: new Date(0) });
        return res.status(401).json(crs.AUTH_401_PING_UNAUTHORIZED());
      }

      const fullName =
        authDoc.member?.fullName ?? authDoc.staff?.fullName ?? null;
      const userAuth = {
        email: authDoc.email,
        role: authDoc.role,
        fullName: fullName,
        username: authDoc.username,
        imageUrl: authDoc?.staff?.imageUrl || authDoc?.member?.imageUrl || null,
      };

      return res.status(200).json(crs.AUTH_200_PING_SUCCESS(userAuth));
    } catch (error) {
      createLog(error);
      return res.status(401).json(crs.AUTH_401_PING_UNAUTHORIZED());
    }
  }
);

authRouter.get("/sign-out", verifyJwtMiddleware, async (req, res) => {
  try {
    await prisma.sessionFingerprint.updateMany({
      where: { authId: req.user.uid },
      data: { isActive: false },
    });
    res.cookie("session", null, { expires: new Date(0) });
    return res.status(200).json(crs.AUTH_200_SIGNOUT_SUCCESS());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

export default authRouter;
