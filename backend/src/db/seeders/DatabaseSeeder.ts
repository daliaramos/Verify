import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { UserSeeder } from "./UserSeeder.js";
import { ReviewSeeder } from "./ReviewSeeders.js";
/* eslint-disable */
export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [UserSeeder, ReviewSeeder]);
	}
}
