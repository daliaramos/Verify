import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import cors from '@fastify/cors';
import config from "./db/mikro-orm.config.js";
import { User } from "./db/entities/User.js";
import verifyRoutes from "./routes/routes.js";
import { fastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import {  AuthPlugin } from "./plugins/auth.js";
/* eslint-disable */

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
        level: "debug",
    },
    production: {
        level: "error"
    },
    test: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
        level: "warn"
    },
};

const app = Fastify({
    logger: envToLogger[process.env.NODE_ENV]
});

await app.register(cors, {
    origin: (origin, cb) => {
        cb(null, true);
    }
});

await app.register(FastifyMikroOrmPlugin, config);
await app.register(fastifySearchHttpMethodPlugin, {});
await app.register(AuthPlugin);
await app.register(verifyRoutes, {});

export default app;
