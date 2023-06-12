import { Migration } from '@mikro-orm/migrations';

export class Migration20230602025703 extends Migration {
/* eslint-disable */
  async up(): Promise<void> {
    this.addSql('alter table "users" add column "password" varchar(255) not null, add column "role" text check ("role" in (\'Admin\', \'User\')) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "password";');
    this.addSql('alter table "users" drop column "role";');
  }

}
