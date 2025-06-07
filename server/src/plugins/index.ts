import { FastifyInstance } from "fastify";
import cors from "./cors";
import helmet from "./helmet";
import cookie from "./cookie";
import rateLimit from "./rate-limit";

export const registerPlugins = async (app: FastifyInstance) => {
  await app.register(cors);
  await app.register(helmet);
  await app.register(cookie);
  await app.register(rateLimit);
};
