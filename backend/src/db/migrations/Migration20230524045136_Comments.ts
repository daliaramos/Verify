import { Migration } from '@mikro-orm/migrations';
/* eslint-disable */
export class Migration20230524045136 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "comment" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "sender_id" int not null, "receiver_id" int not null, "comment" varchar(255) not null);');

    this.addSql('alter table "comment" add constraint "comment_sender_id_foreign" foreign key ("sender_id") references "review" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_receiver_id_foreign" foreign key ("receiver_id") references "review" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "comment" cascade;');
  }

}
