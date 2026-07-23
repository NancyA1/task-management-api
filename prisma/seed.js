const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

    await prisma.task.deleteMany();
    await prisma.project.deleteMany();


    const project1 = await prisma.project.create({
        data: {
            name: "Backend API Project",
            description: "Task management backend using Express and Prisma"
        }
    });


    await prisma.task.createMany({
        data: [
            {
                title: "Create REST API",
                description: "Build project and task endpoints",
                status: "done",
                priority: "high",
                projectId: project1.id
            },
            {
                title: "Add validation",
                description: "Handle request validation",
                status: "todo",
                priority: "medium",
                projectId: project1.id
            }
        ]
    });


    const project2 = await prisma.project.create({
        data: {
            name: "Frontend Dashboard",
            description: "React dashboard for managing tasks"
        }
    });


    await prisma.task.create({
        data: {
            title: "Create dashboard UI",
            description: "Build task cards",
            status: "in_progress",
            priority: "high",
            projectId: project2.id
        }
    });


    console.log("Database seeded successfully 🌱");
}


main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });