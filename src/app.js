const express = require("express");
const projectRoutes = require("./routes/projectRoutes")
const app = express();
app.use("/api/projects",projectRoutes);
app.get("/", ( req,res)=> {
    res.json({
     message: "Welcome to the Task Management API"
    });
});
module.exports = app;