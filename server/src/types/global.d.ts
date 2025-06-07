import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    context: any;
    user: {
      uid: string;
      role?: string;
      rights?: string[];
      [key: string]: any;
    };
  }
}
