const request = require("supertest");
const app = require("../src/app");

test("Should reject past due dates", async () => {

    const projectResponse = await request(app)
        .post("/api/projects")
        .send({
            name: `Due Date Test ${Date.now()}`
        });

    const projectId = projectResponse.body.id;


    const response = await request(app)
        .post(`/api/projects/${projectId}/tasks`)
        .send({
            title: "Past Date Task",
            dueDate: "2020-01-01"
        });


    expect(response.statusCode)
        .toBe(400);


    expect(response.body.message)
        .toBe("Due date cannot be in the past.");

});