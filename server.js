import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./src/app.js";

dotenv.config({});

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const port = parseInt(process.env.APP_PORT, 10) || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Local: http://localhost:${port}`);
});

app.on("close", async () => {
  await mongoose.connection.close();
});
