import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { crs } from "../utils/custom-response-codes";
import { createLog } from "../utils/funtions";
import { decrpt, verifyJwt } from "../utils/jwt";
import prisma from "../models/prisma";

export const verifyJwtMiddleware = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  try {
    const session = request.cookies?.session;

    let jwt = null;
    if (session) {
      const decryted = decrpt(session);
      if (!decryted) throw Error("Decryption failed");
      jwt = verifyJwt(decryted);
    }

    if (jwt === null) {
      reply.cookie("session", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return reply.status(401).send(crs.AUTH401JWT());
    }
    request.user = { uid: jwt.uid };
    done();
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.ERR500JWT(error));
  }
};

export const verifyStaff = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const auth = await prisma.auth.findUnique({
      where: { id: request.user.uid },
      select: {
        role: true,
        rights: true,
      },
    });

    if (!auth?.role) return reply.status(401).send(crs.ADM401JWT());

    request.user.role = auth.role;
    request.user.rights = auth.rights ?? [];

    if (auth.role === "STAFF") return;
    else return reply.status(401).send(crs.ADM401JWT());
  } catch (error) {
    createLog(error);
    return reply.status(500).send(crs.ERR500JWT(error));
  }
};
