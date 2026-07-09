const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToDb = require('./db/db')
const cors = require("cors");


const app = express();
connectToDb();

app.use(cors());




app.get("/", (req, res) => {
    res.send(`server is listening on port`)
})


module.exports = app;