const dotenv = require("dotenv");

const app = require("./src/app");

dotenv.config({});

const bootstrap = async () => {
  const port = parseInt(process.env.APP_PORT, 10) || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Local: http://localhost:${port}`);
  });
};

bootstrap();
