const request = require("supertest");
const app = require("../src/app");
test("Filter tasks by status and priority", async () => {
const projectResponse = await request(app)
    .post("/api/projects")
    .send({
        name: `Filter Project ${Date.now()}`
    });

expect(projectResponse.statusCode).toBe(201);

const projectId = projectResponse.body.id;
const taskResponse = await request(app)
    .post(`/api/projects/${projectId}/tasks`)
    .send({
        title: "Filter Test Task",
        status: "todo",
        priority: "medium"
    });

expect(taskResponse.statusCode).toBe(201);

const response = await request(app)
    .get("/api/tasks?status=todo&priority=medium");
    expect(response.statusCode).toBe(200);

expect(response.body.data.length)
    .toBeGreaterThan(0);
});