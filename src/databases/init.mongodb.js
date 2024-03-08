const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";

mongoose.connect(uri);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB error", error);
});

module.exports = mongoose;
