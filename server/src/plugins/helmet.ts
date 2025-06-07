import fp from "fastify-plugin";
import fastifyHelmet from "@fastify/helmet";

export default fp(async (fastify) => {
  fastify.register(fastifyHelmet);
});
