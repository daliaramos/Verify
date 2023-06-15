import type {EntityManager} from "@mikro-orm/core";
import {Seeder} from "@mikro-orm/seeder";
import {User, UserRole} from "../entities/User.js";
import bcrypt from "bcrypt";

export class UserSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		
		em.create(User, {
			name: "Stacy",
			email: "email@email.com",
			occupation: "dentist assistant",
			role: UserRole.ADMIN,
		});

		em.create(User, {
			name: "Henry",
			email: "email2@email.com",
			occupation: "IT",
			role: UserRole.USER
		});

		em.create(User, {
			name: "Andy",
			email: "email3@email.com",
			occupation: "Nurse",
			role: UserRole.USER,
		});

		em.create(User, {
			name: "Sofia",
			email: "email4@email.com",
			occupation: "Software Engineer",
			role: UserRole.USER,
		});
	}
}
