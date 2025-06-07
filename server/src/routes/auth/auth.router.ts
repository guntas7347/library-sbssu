import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { createLog, createQR, uuid } from "../../utils/funtions";
import { crs } from "../../utils/custom-response-codes";
import { zod_loginCreds, zod_passwordStrength, zod_username } from "./auth.zod";
import {
  create2FA,
  createLink,
  fetchAuthByUserName,
  populate2FaSecret,
  processLink,
  sendVerificationEmail,
  setJwtCookie,
  verify2FA,
  verifyPassword,
  verifyResetLink,
  verifyUsernameForLogin,
} from "./auth.middlewares";
import prisma from "../../models/prisma";
import { verifyJwtMiddleware } from "../../middlewares/auth.middlewares";
import { createPasswordHash } from "../../utils/bycrypt";
import {
  AuthLoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthReply,
  ResetPasswordBody,
  LoginBody,
  ForgotPasswordBody,
} from "./auth.types";

export const authRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: LoginBody }>(
    "/login",
    {
      preHandler: [
        zod_loginCreds,
        verifyUsernameForLogin,
        verifyPassword,
        verify2FA,
        setJwtCookie,
      ],
    },
    async (request: AuthLoginRequest, reply: AuthReply) => {
      try {
        return reply.code(200).send(crs.AUTH200ADM(request.context.userType));
      } catch (error) {
        createLog(error);
        return reply.code(500).send(crs.SERR500REST(error));
      }
    }
  ); // login

  fastify.post<{ Body: { userType: string } }>(
    "/ping",
    { preHandler: [verifyJwtMiddleware] },
    async (request: FastifyRequest<{ Body: { userType: string } }>, reply) => {
      try {
        const userType = request.body.userType;
        const authDoc = await prisma.auth.findUnique({
          where: { id: request.user.uid },
          select: {
            userName: true,
            email: true,
            role: true,
            active: true,
            userType: true,
            staff: { select: { fullName: true } },
            member: { select: { fullName: true } },
          },
        });

        if (!authDoc || !authDoc.active || userType !== authDoc.userType) {
          reply.cookie("session", "", { expires: new Date(0) });
          return reply.status(401).send(crs.AUTH401PING());
        }

        const fullName =
          authDoc.member?.fullName ?? authDoc.staff?.fullName ?? null;

        const userAuth = {
          email: authDoc.email,
          role: authDoc.role,
          fullName: fullName,
          userName: authDoc.userName,
          userType: authDoc.userType,
        };

        return reply.status(200).send(crs.AUTH200PING(userAuth));
      } catch (error) {
        createLog(error);
        return reply.status(401).send(crs.AUTH401PING());
      }
    }
  ); /// ping

  fastify.post("/clear-session", async (request, reply) => {
    try {
      reply.cookie("session", "", { expires: new Date(0) });
      return reply.status(200).send(crs.AUTH200SOUT());
    } catch (error) {
      createLog(error);
      return reply.status(500).send(crs.SERR500REST(error));
    }
  }); /// /clear-session

  fastify.post<{ Body: ForgotPasswordBody }>(
    "/forgot-password",
    {
      preHandler: [
        zod_username,
        fetchAuthByUserName,
        createLink,
        processLink,
        sendVerificationEmail,
      ],
    },
    async (request: ForgotPasswordRequest, reply: AuthReply) => {
      try {
        console.log(request.context.link);
        return reply.code(200).send(crs.AUTH200LDPS());
      } catch (error) {
        createLog(error);
        return reply.code(500).send(crs.SERR500REST(error));
      }
    }
  ); ///    "/forgot-password",

  fastify.post(
    "/verify-reset-link",
    {
      preHandler: [verifyResetLink, create2FA],
    },
    async (request, reply) => {
      try {
        const auth = await prisma.auth.findFirst({
          where: { resetCode: request.body.code },
        });

        if (auth) {
          await prisma.auth.update({
            where: { id: auth.id },
            data: { twoFaSecret: request.context.base32 },
          });
        }
        const qrData = await createQR(request.context.otpauth_url);

        return reply.code(200).send(crs.AUTH200LVFS(qrData));
      } catch (error) {
        createLog(error);
        return reply.code(500).send(crs.SERR500REST(error));
      }
    }
  ); ///    "/verify-reset-link",

  fastify.post<{ Body: ResetPasswordBody }>(
    "/reset-password",
    {
      preHandler: [zod_passwordStrength, populate2FaSecret, verify2FA],
    },
    async (request: ResetPasswordRequest, reply: AuthReply) => {
      try {
        const password = await createPasswordHash(request.body.password);
        if (!password) throw Error("Password not a string");

        await prisma.auth.update({
          where: { id: request.context.authDoc.id },
          data: {
            password,
            resetCode: uuid(),
          },
        });

        return reply.code(200).send(crs.AUTH200RAP());
      } catch (error) {
        createLog(error);
        return reply.code(500).send(crs.SERR500REST(error));
      }
    }
  ); //    "/reset-password",
};
