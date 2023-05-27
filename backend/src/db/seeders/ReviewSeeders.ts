import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Review } from "../entities/Review.js";
/* eslint-disable */
export class ReviewSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        em.create(Review, {
            makeReview: "Great interview"
        });

        em.create(Review, {
            makeReview: "Horrible interview"
        });

        em.create(Review, {
            makeReview: "It was not the best experience"
        });

        em.create(Review, {
            makeReview: "The people were okay but there was one person who was rude"
        });
    }
}
