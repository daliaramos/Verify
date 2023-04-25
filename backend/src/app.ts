import Fastify, {FastifyReply, FastifyRequest} from "fastify";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";
import {User} from "./db/entities/User.js";

/* eslint-disable */
const app = Fastify();
await app.register(FastifyMikroOrmPlugin, config);
app.get("/hello", async(req:FastifyRequest, reply:FastifyReply) =>{
    return "hello";
});
app.get("/dbTest", async(req:FastifyRequest, reply:FastifyReply) =>{
    return req.em.find(User, {});
});

export default app;
