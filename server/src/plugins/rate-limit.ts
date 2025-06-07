import fp from "fastify-plugin";
import fastifyRateLimit from "@fastify/rate-limit";

export default fp(async (fastify) => {
  fastify.register(fastifyRateLimit, {
    max: 1000,
    timeWindow: "15 minutes",
    errorResponseBuilder: () => ({
      statusCode: 429,
      status: "RATELIMIT",
      message:
        "Too many requests from this IP, please try again after 15 minutes",
      payload: null,
    }),
  });
});
