const express = require("express");

const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes");
const app = express();

app.use(express.json());

app.use("/api/projects",projectRoutes);
app.use("/api/projects", taskRoutes);

app.get("/", ( req,res)=> {
    res.json({
     message: "Welcome to the Task Management API"
    });
});

module.exports = app;