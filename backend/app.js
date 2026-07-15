const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectToDb = require('./db/db')
const cors = require("cors");
const userRoutes = require('./routes/user.routes')
require('dotenv').config();



connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res) => {
    res.send(`server is listening`)
})

app.use("/users", userRoutes);

module.exports = app;