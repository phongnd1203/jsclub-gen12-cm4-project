const mongoose = require("mongoose");

const { config } = require("../configs/app.config.js");

mongoose.connect(config.mongodb.uri);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connected");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

module.exports = connection;
