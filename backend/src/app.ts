import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";
import { User } from "./db/entities/User.js";
import verifyRoutes from "./routes/routes.js";
import { fastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
/* eslint-disable */
const app = Fastify();
await app.register(FastifyMikroOrmPlugin, config);
await app.register(fastifySearchHttpMethodPlugin);
await app.register(verifyRoutes);
export default app;
