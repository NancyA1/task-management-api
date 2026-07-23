const request = require("supertest");
const app = require("../src/app");
test("Search tasks and verify pagination", async () => {
const projectResponse = await request(app)
    .post("/api/projects")
    .send({
        name: `Search Project ${Date.now()}`
    });

expect(projectResponse.statusCode).toBe(201);

const projectId = projectResponse.body.id;




});