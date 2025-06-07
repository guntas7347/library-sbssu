import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";

export default fp(async (fastify) => {
  fastify.register(fastifyCors, {
    origin: (origin, cb) => {
      const allowedOrigins = [
        "http://localhost:8080",
        "http://localhost",
        "http://192.168.1.10",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  });
});
