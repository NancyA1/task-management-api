const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const VALID_STATUS = ["todo", "in_progress", "done"];

const VALID_PRIORITY = ["low", "medium", "high"];

const VALID_SORT_FIELDS = [
    "dueDate",
    "priority",
    "createdAt"
];

const createTask = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }
    const { title, description, status, priority, dueDate } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required.",
      });
    }
    if (status && !VALID_STATUS.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value.",
      });
    }

    if (priority && !VALID_PRIORITY.includes(priority)) {
      return res.status(400).json({
        message: "Invalid priority value.",
      });
    }
    if (dueDate) {
      const today = new Date();
      const taskDueDate = new Date(dueDate);

      if (isNaN(taskDueDate.getTime())) {
        return res.status(400).json({
          message: "Invalid due date format.",
        });
      }

      today.setHours(0, 0, 0, 0);
      taskDueDate.setHours(0, 0, 0, 0);

      if (taskDueDate < today) {
        return res.status(400).json({
          message: "Due date cannot be in the past.",
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
        projectId,
      },
    });
    return res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task.",
    });
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve tasks.",
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve task.",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingTask = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const { title, description, status, priority, dueDate } = req.body;
    if (title && title.trim() === "") {
      return res.status(400).json({
        message: "Task title cannot be empty.",
      });
    }
    if (status && !VALID_STATUS.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value.",
      });
    }
    if (priority && !VALID_PRIORITY.includes(priority)) {
      return res.status(400).json({
        message: "Invalid priority value.",
      });
    }
    if (dueDate) {
      const today = new Date();
      const taskDueDate = new Date(dueDate);

      if (isNaN(taskDueDate.getTime())) {
        return res.status(400).json({
          message: "Invalid due date format.",
        });
      }

      today.setHours(0, 0, 0, 0);
      taskDueDate.setHours(0, 0, 0, 0);

      if (taskDueDate < today) {
        return res.status(400).json({
          message: "Due date cannot be in the past.",
        });
      }
    }
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update task.",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }
    const deltask = await prisma.task.delete({
      where: {
        id: id,
      },
    });
    res.json({
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task.",
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const {
    status,
    priority,
    due_date_from,
    due_date_to,
    q,
    sortBy,
    order
} = req.query;

    const where = {};
    const orderBy = {};

    if (status) {
      where.status = status;
    }
    if (priority) {
    where.priority = priority;
}
if (due_date_from || due_date_to) {
    where.dueDate = {};
}
if (due_date_from) {
where.dueDate.gte = new Date(due_date_from);
}

if (due_date_to) {
    where.dueDate.lte = new Date(due_date_to);
}
if (q) {
where.OR = [
    {
        title: {
            contains: q,
        }
    },
    {                    
    description : {
        contains: q,
    }
  }

];
}
if (sortBy && !VALID_SORT_FIELDS.includes(sortBy)) {
    return res.status(400).json({
        message: "Invalid sort field."
    });
}
if (sortBy) {
orderBy[sortBy] = order || "asc";
}
    const tasks = await prisma.task.findMany({
    where,
    orderBy,
      skip,
      take: limit,

      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });

    const total = await prisma.task.count({
        where
    });

    res.json({
      data: tasks,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve tasks.",
    });
  }
};

module.exports = {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
};
