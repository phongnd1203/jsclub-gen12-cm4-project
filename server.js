require("dotenv").config();

const path = require("path");
const fs = require("fs");

const portfinder = require("portfinder");

const app = require("./api");

if (
  fs.existsSync(path.join(__dirname, "private.pem")) &&
  fs.existsSync(path.join(__dirname, "public.pem"))
) {
  process.env.JWT_ASYMMETRIC_PRIVATE_KEY = fs.readFileSync(
    path.join(__dirname, "private.pem"),
    "utf8",
  );
  process.env.JWT_ASYMMETRIC_PUBLIC_KEY = fs.readFileSync(
    path.join(__dirname, "public.pem"),
    "utf8",
  );
}

portfinder.getPortPromise({ port: 3000 }).then((port) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Local: http://localhost:${port}`);
  });
});
