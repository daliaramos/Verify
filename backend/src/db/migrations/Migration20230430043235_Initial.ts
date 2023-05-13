import { Migration } from '@mikro-orm/migrations';
/* eslint-disable */
export class Migration20230430043235 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "name" varchar(255) not null, "pet_type" varchar(255) not null, "is_mached" boolean not null default false);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

}
