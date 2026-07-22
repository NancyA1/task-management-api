const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllProjects = async (req,res)=>{
    try{

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const projects = await prisma.project.findMany({
            skip,
            take: limit
        });

        const total = await prisma.project.count();

        res.json({
            data: projects,
            total,
            page,
            limit
        });

    } catch(error){

        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve projects."
        });
    }
};

const createProject = async (req, res) => {
    try {

        const { name, description } = req.body;

        const project = await prisma.project.create({
            data: {
                name,
                description
            }
        });

        res.status(201).json(project);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create project."
        });

    }
};




module.exports = {
    getAllProjects,
    createProject
};