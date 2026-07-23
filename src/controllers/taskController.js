const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const VALID_STATUS = [
    "todo",
    "in_progress",
    "done"
];

const VALID_PRIORITY = [
    "low",
    "medium",
    "high"
];
const createTask = async (req, res) => {
  try{
  const projectId = Number(req.params.projectId);
const project = await prisma.project.findUnique({
    where: {
        id: projectId
    }
});
  if (!project) {
    return res.status(404).json({
        message: "Project not found."
    });
}
 const {
    title,
    description,
    status,
    priority,
    dueDate
} = req.body;

if (!title || title.trim() === "") {
    return res.status(400).json({
        message: "Task title is required."
    });
}
if (status && !VALID_STATUS.includes(status)) {
    return res.status(400).json({
        message: "Invalid status value."
    });
}

if(priority && !VALID_PRIORITY.includes(priority)){
    return res.status(400).json({
        message: "Invalid priority value."
    });
}
if (dueDate) {
    const today = new Date();
    const taskDueDate = new Date(dueDate);

    if (isNaN(taskDueDate.getTime())) {
        return res.status(400).json({
            message: "Invalid due date format."
        });
    }

    today.setHours(0, 0, 0, 0);
    taskDueDate.setHours(0, 0, 0, 0);

    if (taskDueDate < today) {
        return res.status(400).json({
            message: "Due date cannot be in the past."
        });
    }
}
const task = await prisma.task.create({
    data: {
        title,
        description,
        status: status || "todo",
        priority: priority || "medium",
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId
    }
});
 return res.status(201).json(task);
  }

  catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Failed to create task."
    });
}
};

module.exports = {
    createTask
};