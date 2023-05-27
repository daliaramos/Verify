import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import { User } from "../db/entities/User.js";

/* eslint-disable*/
export function UserRoutesInit(app: FastifyInstance) {
    app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
        return request.em.find(User, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
    });

    app.post<{
        Body: {
            name: string;
            email: string;
            occupation: string;
        };
    }>("/users", async (req, reply) => {
        const { name, email, occupation } = req.body;
        try {
            const newUser = await req.em.create(User, {
                name,
                email,
                occupation,
            });
            await req.em.flush();

            console.log("created new user", newUser);
            return reply.send(newUser);
        } catch (err) {
            console.log("failed to create a new user", err.message);
            return reply.status(500).send({ message: err.message });
        }
    });

    //READ
    app.search("/users", async (req, reply) => {
        const { email } = req.body;
        try {
            const theUser = await req.em.findOne(User, { email });
            console.log(theUser);
            reply.send(theUser);
        } catch (err) {
            console.log(err);
            reply.status(500).send(err);
        }
    });

    //update
    app.put<{
        Body: {
            name: string;
            email: string;
            occupation: string;
        };
    }>("/users", async (req, reply) => {
        const { name, email, occupation } = req.body;

        const userToChange = await req.em.findOne(User, { email });
        userToChange.name = name;
        userToChange.occupation = occupation;

        await req.em.flush();
        console.log(userToChange);
        reply.send(userToChange);
    });

    //Delete
    app.delete<{ Body: { email: string } }>("/users", async (req, reply) => {
        const { email } = req.body;
        try {
            const theUser = await req.em.findOne(User, { email });

            await req.em.remove(theUser).flush();
            console.log(theUser);
            reply.send(theUser);
        } catch (err) {
            console.log(err);
            reply.status(500).send(err);
        }
    });
}
