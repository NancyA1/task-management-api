const request = require("supertest");
const app = require("../src/app");

test("Create project -> create task -> update task -> delete project", async () => {

    const projectResponse = await request(app)
        .post("/api/projects")
        .send({
    name: `TEST Project ${Date.now()}`
});

    expect(projectResponse.statusCode).toBe(201);

    const projectId = projectResponse.body.id;


    const taskResponse = await request(app)
        .post(`/api/projects/${projectId}/tasks`)
        .send({
            title: "TEST Task",
            description: "Testing task creation"
        });

    expect(taskResponse.statusCode).toBe(201);

    const taskId = taskResponse.body.id;

    const updateResponse = await request(app)
    .put(`/api/tasks/${taskId}`)
    .send({
        status: "done"
    });

expect(updateResponse.statusCode).toBe(200);

expect(updateResponse.body.status)
    .toBe("done");

const deleteResponse = await request(app)
    .delete(`/api/projects/${projectId}`);

expect(deleteResponse.statusCode).toBe(200);


const deletedTask = await request(app)
    .get(`/api/tasks/${taskId}`);

expect(deletedTask.statusCode).toBe(404);
});