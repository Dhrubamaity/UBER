const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectToDb = require('./db/db')
const cors = require("cors");
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const cookieParser = require("cookie-parser");
const { cookie } = require("express-validator");
require('dotenv').config();




connectToDb();

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res) => {
    res.send(`server is listening`)
})

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;