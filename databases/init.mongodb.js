const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";

mongoose.connect(uri);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connected");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

module.exports = connection;
