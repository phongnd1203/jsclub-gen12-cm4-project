const mongoose = require("mongoose");

const mongodbConfig = require("../configs/mongodb.config.js");

const config = mongodbConfig();

mongoose.connect(config.uri);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connected");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

module.exports = connection;
