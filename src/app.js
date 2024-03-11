const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongodbConnection = require("./databases/init.mongodb.js");

const app = express();

app.on("close", async () => {
  await mongodbConnection.close();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

module.exports = app;
