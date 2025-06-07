import Fastify from "fastify";
import { registerPlugins } from "./plugins/index";
import router from "./routes/router";
import fastifyStatic from "@fastify/static";
import path from "path";

const buildServer = async () => {
  const app = Fastify();

  await registerPlugins(app);

  app.register(router, { prefix: "/api" });

  app.register(fastifyStatic, {
    root: path.join(__dirname, "..", "uploads"),
    prefix: "/uploads/",
    decorateReply: false,
  });

  app.register(fastifyStatic, {
    root: path.join(__dirname, "..", "dist"),
    prefix: "/",
  });

  app.setNotFoundHandler((req, reply) => {
    if (
      req.raw.url?.startsWith("/api") ||
      req.raw.url?.startsWith("/uploads")
    ) {
      return reply.status(404).send({ error: "Not Found" });
    }
    return reply.sendFile("index.html");
  });

  return app;
};

export default buildServer;
