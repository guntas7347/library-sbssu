import { FastifyPluginAsync } from "fastify";
import { authRouter } from "./auth/auth.router";

const router: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("onRequest", async (request) => {
    if (!request.context) request.context = {};
    console.log(
      `[${new Date().toLocaleTimeString()}] ${request.method} ${request.url}`,
      request.body ? `body: ${JSON.stringify(request.body)}` : ""
    );
  });
  fastify.register(authRouter, { prefix: "/auth" });
};

export default router;
