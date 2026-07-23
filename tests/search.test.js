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


    const searchKeyword = `Backend${Date.now()}`;

    const taskTitle = `JavaScript ${searchKeyword} Task`;


    const taskResponse1 = await request(app)
        .post(`/api/projects/${projectId}/tasks`)
        .send({
            title: taskTitle,
            description: "Learn Express and Prisma"
        });

    expect(taskResponse1.statusCode).toBe(201);



    const taskResponse2 = await request(app)
        .post(`/api/projects/${projectId}/tasks`)
        .send({
            title: `Frontend Task ${Date.now()}`,
            description: "Learn React"
        });

    expect(taskResponse2.statusCode).toBe(201);



    const response = await request(app)
        .get(`/api/tasks?q=${searchKeyword}&page=1&limit=1`);



    expect(response.statusCode)
        .toBe(200);


    expect(response.body.total)
        .toBe(1);


    expect(response.body.page)
        .toBe(1);


    expect(response.body.limit)
        .toBe(1);


    expect(response.body.data.length)
        .toBe(1);


    expect(response.body.data[0].title)
        .toBe(taskTitle);

});