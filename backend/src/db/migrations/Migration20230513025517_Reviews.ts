import { Migration } from "@mikro-orm/migrations";
/* eslint-disable */
export class Migration20230513025517 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "review" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "owner_id" int not null, "make_review" varchar(255) not null);'
		);

		this.addSql(
			'alter table "review" add constraint "review_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;'
		);

		this.addSql('drop table if exists "match" cascade;');

		this.addSql('alter table "users" add column "deleted_at" timestamptz(0) null;');
		this.addSql('alter table "users" drop column "is_mached";');
		this.addSql('alter table "users" rename column "pet_type" to "occupation";');
	}

	async down(): Promise<void> {
		this.addSql(
			'create table "match" ("owner_id" int not null, "matchee_id" int not null, "created_at" timestamptz(0) not null, constraint "match_pkey" primary key ("owner_id", "matchee_id"));'
		);

		this.addSql(
			'alter table "match" add constraint "match_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;'
		);
		this.addSql(
			'alter table "match" add constraint "match_matchee_id_foreign" foreign key ("matchee_id") references "users" ("id") on update cascade;'
		);

		this.addSql('drop table if exists "review" cascade;');

		this.addSql('alter table "users" add column "is_mached" boolean not null default false;');
		this.addSql('alter table "users" drop column "deleted_at";');
		this.addSql('alter table "users" rename column "occupation" to "pet_type";');
	}
}
