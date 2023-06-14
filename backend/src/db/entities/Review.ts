import { Entity, Property, ManyToOne, Cascade, OneToMany, Collection } from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292

import type {Ref} from "@mikro-orm/core";

import {User} from "./User.js";

import { VerifyBaseEntity } from "./VerifyBaseEntity.js";


@Entity()
export class Review extends VerifyBaseEntity {

	// One user can have many reviews
	@ManyToOne()
	owner!: Ref<User>;

	@Property()
	makeReview!: string;
	
	@Property()
	company!: string;

}
