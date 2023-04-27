import Fastify, {FastifyReply, FastifyRequest} from "fastify";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";
import {User} from "./db/entities/User.js";
import DoggerRoutes from './routes.js';
/* eslint-disable */
const app = Fastify();
await app.register(FastifyMikroOrmPlugin, config);
await app.register(DoggerRoutes);

export default app;
