import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import app from "./app.js";
import { User } from "./db/entities/User.js";
import { Review } from "./db/entities/Review.js";


/** This function creates all backend routes for the site.
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param _options - Fastify instance options
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
async function DoggerRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
	app.get("/hello", async (req: FastifyRequest, reply: FastifyReply) => {
		return "hello";
	});

	app.get("/dbTest", async (req: FastifyRequest, reply: FastifyReply) => {
		return req.em.find(User, {});
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

	app.post<{ Body: { reviewer_id: number; review: string } }>("/review", async (req, reply) => {
		const { reviewer_id, review } = req.body;

		try {
			const userRepository = req.em.getRepository(User);
			const reviewerEntity = await userRepository.getReference(reviewer_id);
			const newReview = await req.em.create(Review, {
				owner: reviewerEntity,
				makeReview: review,
			});
			await req.em.flush();

			// Let the user know everything went fine
			return reply.send(newReview);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
	app.search<{ Body: { reviewer_id: number } }>("/review", async (req, reply) => {
		const { reviewer_id } = req.body;

		try {
			const reviewerEntity = await req.em.getReference(User, reviewer_id);

			const review = await req.em.find(Review, { owner: reviewerEntity });
			console.log(review);
			return reply.send(review);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	app.put<{ Body: { review_id: number; review: string } }>("/review", async (req, reply) => {
		const { review_id, review } = req.body;
		try {
			const userReview = await req.em.findOneOrFail(Review, review_id);
			userReview.makeReview = review;
			await req.em.persistAndFlush(userReview);
			return reply.send(userReview);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	/*
	app.delete<{ Body: { review_id: number } }>("/review", async (req, reply) => {
		const {  review_id } = req.body;
		
		try {
			
			const revToDelete = await req.em.findOneOrFail(Review,  review_id );
			console.log(revToDelete);
			
			await req.em.removeAndFlush(revToDelete);
			return reply.send(revToDelete);
			
			
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
*/
}

export default DoggerRoutes;
