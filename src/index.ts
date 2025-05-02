import dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import compress from "@fastify/compress";
import helmet from "@fastify/helmet";
import apiRoutes from "./routes/api";
import { config } from "./config";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";

const logger =
  config.env === "development"
    ? {
        transport: {
          target: "pino-pretty",
        },
        level: "debug",
      }
    : {
        level: "warn",
      };

const fastify = Fastify({ logger, bodyLimit: 1048576 });

fastify.register(cors, {
  // origin: ["https://leloponalobi.org"],
  origin: ["*"],
});
fastify.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted.cdn.com"],
      styleSrc: ["'self'", "https://trusted.cdn.com"],
      imgSrc: ["'self'", "data:"],
    },
  },
});
fastify.register(compress);
fastify.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute",
});
fastify.register(apiRoutes, { prefix: "/api" });
fastify.addHook("onSend", async (request, reply, payload) => {
  reply.header("X-Powered-By", "");
  return payload;
});
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({ error: "Internal Server Error" });
});

const start = async () => {
  try {
    await fastify.listen({ port: config.port, host: config.host });
    console.log(
      `Fastify server running on http://${config.host}:${config.port}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
