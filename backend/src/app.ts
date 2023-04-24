import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {FastifyMikroOrmPlugin} from "./plugins/mikro";
import config from "./db/mikro-orm.config";
import {User} from "./db/entities/User";

const app: FastifyInstance = Fastify();
await app.register(FastifyMikroOrmPlugin, config);
app.get("/hello", async(req:FastifyRequest, reply:FastifyReply) =>{
    return "hello";
});
app.get("/dbTest", async(req:FastifyRequest, reply:FastifyReply) =>{
    return req.em.find(User, {});
});

export default app;
