import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Review } from "../entities/Review.js";
/* eslint-disable */
export class ReviewSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        em.create(Review, {
            owner: 1,
            makeReview: "Great interview",
        });

        em.create(Review, {
            owner: 2,
            makeReview: "Horrible interview"
        });

        em.create(Review, {
            owner: 3,
            makeReview: "It was not the best experience"
        });

        em.create(Review, {
            owner: 4,
            makeReview: "The people were okay but there was one person who was rude",
        });
    }
}
