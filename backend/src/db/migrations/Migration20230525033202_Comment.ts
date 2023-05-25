import { Migration } from '@mikro-orm/migrations';

export class Migration20230525033202 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comment" drop constraint "comment_sender_id_foreign";');
    this.addSql('alter table "comment" drop constraint "comment_receiver_id_foreign";');

    this.addSql('alter table "comment" add constraint "comment_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_receiver_id_foreign" foreign key ("receiver_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "comment" drop constraint "comment_sender_id_foreign";');
    this.addSql('alter table "comment" drop constraint "comment_receiver_id_foreign";');

    this.addSql('alter table "comment" add constraint "comment_sender_id_foreign" foreign key ("sender_id") references "review" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_receiver_id_foreign" foreign key ("receiver_id") references "review" ("id") on update cascade;');
  }

}
