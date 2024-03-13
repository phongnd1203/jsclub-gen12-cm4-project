require("dotenv").config();

const app = require("./api");

const port = parseInt(process.env.APP_PORT, 10) || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Local: http://localhost:${port}`);
});
