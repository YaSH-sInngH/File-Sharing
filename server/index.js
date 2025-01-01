// const express = require('express')
// OR another way of importing exoress is:
import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import DBConnection from "./database/db.js";

// initializing express
const app = express();
// defining port
const PORT = 3000;

//using cors
app.use(cors());
//using router
app.use('/', router);

// Database Connection
DBConnection();

//listening on port
app.listen(PORT, ()=>console.log(`Server is Running on PORT: ${PORT}`));