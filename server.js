require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3013;
const urlDB= process.env.URL_MONGODB;

mongoose.connect(urlDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const usersRouter = require("./routers/users");
app.use("/ChocoAndino", usersRouter);

app.listen(port, () => console.log("Server Started on port ", + port));
