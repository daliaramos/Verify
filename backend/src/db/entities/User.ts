
import {Cascade, Collection, Entity, OneToMany, Property, Unique} from "@mikro-orm/core";

//import {Comment} from "./Comment.js";
import { Review } from "./Review.js";
import { VerifyBaseEntity } from "./VerifyBaseEntity.js";
import { SoftDeletable } from "mikro-orm-soft-delete";

SoftDeletable(
	() => User,
	"deleted_at",
	() => new Date()
);
@Entity({ tableName: "users" })
export class User extends VerifyBaseEntity {
	@Property()
	@Unique()
	email!: string;

	@Property()
	name!: string;

	@Property()
	occupation!: string;

	//One user can have many reviews
	@OneToMany(() => Review, (review) => review.owner, {
		cascade: [Cascade.PERSIST, Cascade.REMOVE],
		orphanRemoval: true,
	})
	reviews!: Collection<Review>;
}
