import { Entity, Property, Unique, ManyToOne} from "@mikro-orm/core";
import { User } from "./User.js";

// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type {Ref} from "@mikro-orm/core";



@Entity()
export class Match {
    // The person who performed the match/swiped right
    @ManyToOne({ primary: true })
    owner!: Ref<User>;
    
    // The account whose profile was swiped-right-on
    @ManyToOne({ primary: true })
    matchee!: Ref<User>;
    
    @Property()
    created_at = new Date();
    
    @Property({ nullable: true })
    deleted_at?: Date;
}
