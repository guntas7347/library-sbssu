import speakeasy from "speakeasy";
import prisma from "../../models/prisma";

import { createLog, uuid } from "../../utils/funtions";
import {
  Auth2FARequest,
  AuthCodeRequest,
  AuthLinkRequest,
  AuthLoginRequest,
  AuthReply,
  AuthUserNameRequest,
  loginContext,
} from "./auth.types";
import { checkPassword } from "../../utils/bycrypt";
import { crs } from "../../utils/custom-response-codes";
import { createJWT, encrypt } from "../../utils/jwt";
import { sendMail } from "../../utils/nodemailer";
import { mailTemplate } from "../../utils/email-emplates";
import { date } from "zod/dist/types/v4";
import { FastifyReply, FastifyRequest } from "fastify";

export const verifyUsernameForLogin = async (
  request: AuthLoginRequest,
  reply: AuthReply
) => {
  try {
    const { userName, password } = request.body;

    if (!userName || !password)
      return reply.status(400).send(crs.BADREQ("Missing username or password"));

    const authDoc = await prisma.auth.findUnique({
      where: { userName: userName.toLowerCase() },
      select: {
        id: true,
        password: true,
        role: true,
        twoFaSecret: true,
        userType: true,
      },
    });

    if (!authDoc) return reply.status(404).send(crs.AUTH404ADM());

    request.context = {
      password,
      hash: authDoc.password,
      _id: authDoc.id,
      role: authDoc.role,
      secret: authDoc.twoFaSecret,
      userType: authDoc.userType,
    } as loginContext;
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const verifyPassword = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { password, hash } = request.context as loginContext;
    const result = await checkPassword(password, hash);
    if (!result) return reply.status(401).send(crs.AUTH401VPASS());
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const create2FA = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    let name = "Library SBSSU";
    if (request.context?.userName)
      name = `${name}: ${request.context.userName}`;

    const { base32, otpauth_url } = speakeasy.generateSecret({
      name,
    });

    request.context.otpauth_url = otpauth_url;
    request.context.base32 = base32;
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const verify2FA = async (request: Auth2FARequest, reply: AuthReply) => {
  try {
    const verified = speakeasy.totp.verify({
      secret: request.context.secret,
      encoding: "base32",
      token: request.body.totp,
      window: 1,
    });

    if (!verified) return reply.status(401).send(crs.AUTH401RAPV());
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const setJwtCookie = async (
  request: AuthLoginRequest,
  reply: FastifyReply
) => {
  const COOKIE_EXPIRY_MINUTES = 60;
  // JWT_EXPIRE IS SET IN CREATE JWT FUNCTION

  try {
    const { _id } = request.context;
    const jwtCredentials = { uid: _id };
    const jwt: string = createJWT(jwtCredentials);
    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * COOKIE_EXPIRY_MINUTES),
      path: "/",
    };
    const encryptedJwt = encrypt(jwt);
    if (!encryptedJwt)
      return reply.status(500).send(crs.CUST("Session encryption failed"));

    reply.cookie("session", encryptedJwt, cookieOptions);
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const fetchAuthByUserName = async (
  request: AuthUserNameRequest,
  reply: AuthReply
) => {
  try {
    const authAdminDoc = await prisma.auth.findUnique({
      where: { userName: request.body.userName },
      select: { id: true, userName: true, email: true },
    });

    if (!authAdminDoc) return reply.status(409).send(crs.AUTH404RAPI());

    request.context = authAdminDoc;
  } catch (error: any) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const createLink = async (
  request: AuthLinkRequest,
  reply: AuthReply
) => {
  try {
    const code = uuid();
    const link = `${request.body.url}/login/reset-password/${code}`;
    request.context.code = code;
    request.context.link = link;
    console.log(link);
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const processLink = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await prisma.auth.update({
      where: { id: request.context.id },
      data: {
        resetCode: request.context.code,
        resetCodeTime: new Date(),
      },
    });
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const sendVerificationEmail = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    console.log(request.context);
    await sendMail(
      request.context.email,
      "Reset Password",
      mailTemplate.resetPassword(request.context.userName, request.context.link)
    );
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const verifyResetLink = async (
  request: AuthCodeRequest,
  reply: AuthReply
) => {
  try {
    const { code } = request.body;
    const authAdmin = await prisma.auth.findFirst({
      where: { resetCode: code },
      select: { resetCodeTime: true, userName: true },
    });
    if (!authAdmin) return reply.status(404).send(crs.AUTH404LDPS());
    if (!authAdmin.resetCodeTime) throw Error("Invalid reset code time");
    const resetCodeTime = new Date(authAdmin.resetCodeTime);
    const timePassed = (Date.now() - resetCodeTime.getTime()) / 1000 / 60;
    if (timePassed > 10) return reply.status(404).send(crs.AUTH404LDPS());
    request.context.userName = authAdmin.userName;
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};

export const populate2FaSecret = async (
  request: AuthCodeRequest,
  reply: AuthReply
) => {
  try {
    const authDoc = await prisma.auth.findFirst({
      where: { resetCode: request.body.code },
      select: {
        twoFaSecret: true,
        id: true,
      },
    });
    if (!authDoc?.twoFaSecret) throw Error("2fa secret not found");
    request.context.secret = authDoc.twoFaSecret;
    request.context.authDoc = authDoc;
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.SERR500REST(error));
  }
};
