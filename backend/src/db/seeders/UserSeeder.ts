import type {EntityManager} from "@mikro-orm/core";
import {Seeder} from "@mikro-orm/seeder";
import {User, UserRole} from "../entities/User.js";
import bcrypt from "bcrypt";

export class UserSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		
		const hashedPassword = await bcrypt.hash("password", 10);
		em.create(User, {
			name: "Stacy",
			email: "email@email.com",
			occupation: "dentist assistant",
			password: hashedPassword,
			role: UserRole.ADMIN,
		});

		em.create(User, {
			name: "Henry",
			email: "email2@email.com",
			occupation: "IT",
			password: hashedPassword,
			role: UserRole.USER
		});

		em.create(User, {
			name: "Andy",
			email: "email3@email.com",
			occupation: "Nurse",
			password: hashedPassword,
			role: UserRole.USER,
		});

		em.create(User, {
			name: "Sofia",
			email: "email4@email.com",
			occupation: "Software Engineer",
			password: hashedPassword,
			role: UserRole.USER,
		});
	}
}
