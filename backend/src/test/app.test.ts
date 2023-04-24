import 'chai/register-should.js';
import {test, teardown} from "tap";
//import {faker} from "@faker-js/faker";
import app from '../app.js';


test("requesttt the /hello route", async()=> {
    const response = await app.inject({
        method:"GET",
        url:"/hello"
    });
    response.statusCode.should.equal(200);
    response.body.should.equal("hello");
});

teardown(()=> app.close());
