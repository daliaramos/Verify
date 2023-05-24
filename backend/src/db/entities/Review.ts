import {Entity, Property, ManyToOne, Cascade, OneToMany, Collection} from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type {Ref, Rel} from "@mikro-orm/core";
import {User} from "./User.js";
import { VerifyBaseEntity } from "./VerifyBaseEntity.js";
//import { Comment } from "./Comment.js";

@Entity()
export class Review extends VerifyBaseEntity {
    
    // One user can have many reviews
    @ManyToOne('User')
    owner!: Rel<User>;
    
    
    @Property()
    makeReview!: string;
    /*
    @OneToMany(
      () => Comment,
      comment => comment.owner,
      {cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
    )
    commented!: Collection<Comment>;
    
    @OneToMany(
      () => Comment,
      comment => comment.reply,
      {cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
    )
    repliesToComment!: Collection<Comment
     */
}
