const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

// app initialize FIRST
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// DB connection
const connectToDB = require("./db/db");
connectToDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const userRoutes = require("./route/user.route");
const captainRoutes = require('./route/captain.routes')

app.get("/", (req, res) => {
    res.send("server is running");
});

app.use("/user", userRoutes);
app.use('/captains', captainRoutes)

module.exports = app;
