// @ts-nocheck
import * as dotenv from "dotenv";

dotenv.config();
import "chai/register-should.js"; // Using Should style
// @ts-ignore
import tap from "tap";
import { MikroORM, ISeedManager } from "@mikro-orm/core";
import { faker } from "@faker-js/faker";
import app from "../src/app.js";
import config from "../src/db/mikro-orm.config.js";
import { DatabaseSeeder } from "../src/db/seeders/DatabaseSeeder.js";

let orm: MikroORM;

tap.before(async () => {
	app.log.warn("Initializing database...");
	orm = await MikroORM.init(config);
	const seeder: ISeedManager = orm.getSeeder();
	app.log.warn("Refreshing database schema...");
	await orm.getSchemaGenerator()
		.refreshDatabase();
	app.log.warn("Database refreshed, seeding...");
	await seeder.seed(DatabaseSeeder);
	app.log.warn("Finished seeding.");
});

tap.teardown(async () => {
	await orm.close();
	await app.close();
});

void tap.test("List all users from /dbvoid tap.test", async () => {
	const response = await app.inject({
		method: "GET",
		url: "/dbTest"
	});
	
	response.statusCode.should.equal(200);
});


void tap.test("Creating a new Review", async () => {
	const payload = {
		reviewer_id: 1,
		review: "The interview went well. The intervieweers were great!",
		company: "Spotify"
	};
	
	const response = await app.inject({
		method: "POST",
		url: "/review",
		payload
	});
	
	response.statusCode.should.equal(200);

});


void tap.test("Searchg for a review  ", async () => {
	const payload = {
		reviewer_id: 1
	};
	
	const response = await app.inject({
		method: "SEARCH",
		url: "/review",
		payload
	});
	
	response.statusCode.should.equal(200);
});




void tap.test("Updating a Review", async () => {
	const payload = {
		review_id: 1,
		review: "Actually the interew went horrible.",
		company: "Spotify"
	};
	
	const response = await app.inject({
		method: "PUT",
		url: "/review",
		payload
	});
	
	response.statusCode.should.equal(200);
	const resPayload = response.json();
	resPayload.makeReview.should.equal(payload.review);
});

void tap.test("Deleting a review", async () => {
	const payload = {
		review_id: 3,
	};
	
	const response = await app.inject({
		method: "DELETE",
		url: "/review",
		payload
	});
	
	console.log(response.payload);
	
	response.statusCode.should.equal(200);
});

void tap.test("Search for a Company", async () => {
	const payload = {
		company: "Trimet",
	};
	
	const response = await app.inject({
		method: "SEARCH",
		url: "/search",
		payload
	});
	
	console.log(response.payload);
	
	response.statusCode.should.equal(200);
});



