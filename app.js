require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
const port =  process.env.PORT || 3658 ;

const DB = require('./config/db');

const userRoute = require("./routes/userRoutes");
const taskRoute = require("./routes/taskRoutes");


//! connect to mongom database
DB();


//! Router for users and tasks
app.use('/', userRoute);
app.use('/', taskRoute);

//todo: if the request wrong or not exist
app.use((req,res) => {res.status(400).send({URI: req.originalUrl, message: "Requist not exist"})});



app.listen(port, () => console.log("Hi from Express 🖐 ", port));