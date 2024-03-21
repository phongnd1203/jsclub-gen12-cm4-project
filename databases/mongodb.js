const mongoose = require("mongoose");

const { config } = require("../configs/appConfig.js");

mongoose.connect(config.mongodb.uri);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connected");
});

connection.on("error", (error) => {
  console.error("MongoDB connection error", error);
});

module.exports = connection;
