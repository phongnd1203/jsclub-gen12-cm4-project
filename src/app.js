const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const mongodbConnection = require("./databases/init.mongodb.js");

const loginRoute = require("./routes/auth/login.route.js");
const registerRoute = require("./routes/auth/register.route.js");

app.on("close", async () => {
  await mongodbConnection.close();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "static")));
app.use(
  session({
    name: "sid",
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      client: mongodbConnection.getClient(),
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // = 14 days. Default
      autoRemove: "native",
      autoRemoveInterval: 10, // In minutes. Default
      crypto: {
        secret: process.env.MONGODB_SESSION_SECRET,
      },
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
    },
  }),
);

app.use("/auth/login", loginRoute);
app.use("/auth/register", registerRoute);

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

module.exports = app;
