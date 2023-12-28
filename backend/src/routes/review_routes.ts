import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {Review} from "../db/entities/Review.js";
import {User} from "../db/entities/User.js";
/**
 * @param {FastifyInstance} app - fastigy dsda
 */

/* eslint-disable*/
export function ReviewRoutesInit(app: FastifyInstance) {
    
    
    app.post<{ Body: { reviewer_id: number; review: string, company: string } }>("/review", async (req, reply) => {
        const { reviewer_id, review, company } = req.body;

        try {
            const userRepository = req.em.getRepository(User);
            const reviewerEntity = await userRepository.getReference(reviewer_id);
            const newReview = await req.em.create(Review, {
                owner: reviewerEntity,
                makeReview: review,
                company: company,
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

    app.put<{ Body: { review_id: number; review: string, company: string} }>("/review", async (req, reply) => {
        const { review_id, review , company} = req.body;
        try {
            const userReview = await req.em.findOneOrFail(Review, review_id, {strict: true});
            userReview.makeReview = review;
            userReview.company = company;
            await req.em.persistAndFlush(userReview);
            return reply.send(userReview);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });
    
    //Route to delete review
    app.delete<{ Body: { review_id: number } }>("/review", async (req, reply) => {
        const { review_id } = req.body;
        try {
            const reviewToDelete = await req.em.findOneOrFail(Review, review_id, {strict: true});
            await req.em.removeAndFlush(reviewToDelete);
            return reply.send(reviewToDelete);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });
    
    //Route to search for company property in reviewdb.
    app.search<{ Body: { company: string } }>("/search", async (req, reply) => {
        const { company } = req.body;
        try {
            //const reviewerEntity = await req.em.getReference(User, reviewer_id);
            const companyReview = await req.em.find(Review, { company: company });
            console.log(companyReview );
            return reply.send(companyReview);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

}
