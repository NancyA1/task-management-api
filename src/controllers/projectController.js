const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllProjects= async (req,res)=>{
    try{  
    const projects= await prisma.project.findMany();
    res.json(projects);
}
catch (error){
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