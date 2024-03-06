const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./src/app");

dotenv.config({});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017")
  .then(() => {
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
