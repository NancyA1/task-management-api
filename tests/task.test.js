const request = require("supertest");
const app = require("../src/app");

test("API should be running", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);

    expect(response.body.message)
        .toBe("Welcome to the Task Management API");
});