import "chai/register-should.js";
import { test, teardown } from "tap";
import { faker } from "@faker-js/faker";
import app from "../src/app.js";
teardown(() => app.close());

/* eslint-disable */
test("request the /hello route", async () => {
	const response = await app.inject({
		method: "GET",
		url: "/hello",
	});
	response.statusCode.should.equal(200);
	response.body.should.equal("hello");
});

/*
test("List users from /dbtest", async() =>{
    const response = await app.inject({
        method: "GET",
        url: "/dbTest"
    });
    response.statusCode.should.equal(200);
});

test("Creating a new user", async()=>{
    const payload = {
        name: "TestName",
        email: faker.internet.email(),
        petType: "Dog"
    };
    
    const response = await app.inject({
        method: "POST",
        url: "/users",
        payload
    });
    
    response.statusCode.should.equal(200);
    response.statusCode.should.not.equal(payload);
    const resPayload = response.json();
    resPayload.email.should.equal(payload.email);
    resPayload.petType.should.equal("Dog");
});
*/
