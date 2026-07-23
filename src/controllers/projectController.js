const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllProjects = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const projects = await prisma.project.findMany({
      skip,
      take: limit,
    });

    const total = await prisma.project.count();

    res.json({
      data: projects,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve projects.",
    });
  }
};

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim() === "" ) {
    return res.status(400).json({
        message: "Project name is required."
    });
}
   const duplicateProject = await prisma.project.findUnique({
    where: {
        name: name
    }
});
if (duplicateProject) {
    return res.status(409).json({
        message: "Project name already exists."
    });
}
    
    const project = await prisma.project.create({
      data: {
        name,
        description,
      },
    });

  return res.status(201).json(project);
  }
   catch (error) {
    res.status(500).json({
      message: "Failed to create project.",
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
    });
    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }
    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve project.",
    });
  }
};

const updateProject = async (req, res) => {
  try {
      
     console.log("Body:", req.body);

    const id = Number(req.params.id);
    
    const { name, description } = req.body;

    const existingProject = await prisma.project.findUnique({
    where: {
        id: id
    }
});

if (!existingProject) {
    return res.status(404).json({
        message: "Project not found."
    });
}
   if (!name || name.trim() === "" ) {
    return res.status(400).json({
        message: "Project name is required."
    });
}
const duplicateProject = await prisma.project.findUnique({
    where: {
        name: name
    }
});
if (duplicateProject && duplicateProject.id !== id) {
    return res.status(409).json({
        message: "Project name already exists."
    });
}

    const project = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
      },
    });
    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project.",
      error: error.message
    });
  }
};


const deleteProject = async ( req,res) => { 
  try{
  const id = Number(req.params.id);
  const project = await prisma.project.findUnique({
    where :{
        id:id
    }
  })
  if(!project){
    return res.status(404).json({
     message: "Project not found."
    });
  }

  const delProject = await prisma.project.delete({
    where:{
        id:id
    }
  })
  return res.json({
      message: "Project deleted successfully."
    });


  }
  
catch (error) {

console.error(error);

    res.status(500).json({
      message: "Failed to delete project.",
      error: error.message
    });
}

};


module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject
};
