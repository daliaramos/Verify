import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import app from "./app.js";
import {User} from "./db/entities/User.js";



async function DoggerRoutes(app: FastifyInstance, _options = {}){
	if(!app){
		throw new Error("Fastify instance has no value during routes construction");
	}
	app.get("/hello", async(req:FastifyRequest, reply:FastifyReply) =>{
		return "hello";
	});
	app.get("/dbTest", async(req:FastifyRequest, reply:FastifyReply) =>{
		return req.em.find(User, {});
	});
	app.post<{
		Body:{
			name: string,
			email: string,
			petType: string
		}
	}>("/users", async(req, reply) => {
		const {name, email, petType} = req.body;
		try{
			const newUser = await req.em.create(User,{
				name,
				email,
				petType
			});
			await req.em.flush();
			
			console.log("created new user", newUser);
			return reply.send(newUser);
		}catch(err){
			console.log("failed to create a new user", err.message);
			return reply.status(500).send({message: err.message});
		}
	});
}
export default DoggerRoutes;
