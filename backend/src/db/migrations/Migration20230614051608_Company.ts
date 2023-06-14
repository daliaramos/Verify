import { Migration } from '@mikro-orm/migrations';

export class Migration20230614051608 extends Migration {/* eslint-disable */
  async up(): Promise<void> {
    this.addSql('alter table "review" add column "company" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "review" drop column "company";');
  }

}
