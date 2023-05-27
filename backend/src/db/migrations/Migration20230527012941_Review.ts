import { Migration } from '@mikro-orm/migrations';

export class Migration20230527012941 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "email" varchar(255) not null, "name" varchar(255) not null, "occupation" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "review" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "owner_id" int not null, "make_review" varchar(255) not null);');

    this.addSql('alter table "review" add constraint "review_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" drop constraint "review_owner_id_foreign";');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "review" cascade;');
  }

}
