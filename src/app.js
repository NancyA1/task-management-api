const express = require("express");
const app = express();
app.get("/", ( req,res)=> {
    res.json({
     message: "Welcome to the Task Management API"
    });
});
module.exports = app;