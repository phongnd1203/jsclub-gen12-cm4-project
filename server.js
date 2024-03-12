require("dotenv").config();

const app = require("./src/app");
const mongoose = require("./src/databases/init.mongodb.js");
const redis = require("./src/databases/init.redis.js");

const port = parseInt(process.env.APP_PORT, 10) || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Local: http://localhost:${port}`);
});

app.on("close", async () => {
  await mongoose.connection.close();
  await redis.disconnect();
});
