const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");

const MongoStore = require("connect-mongo");
const mongodbConnection = require("../databases/init.mongodb.js");

const app = express();

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: "sid",
    secret: process.env.APP_SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
    store: MongoStore.create({
      client: mongodbConnection.getClient(),
      collectionName: "sessions",
      ttl: 60 * 60 * 24 * 14,
      autoRemove: "native",
      autoRemoveInterval: 10,
      crypto: {
        secret:
          process.env.MONGODB_SESSION_SECRET || process.env.APP_SESSION_SECRET,
      },
    }),
  }),
);

app.use("/login", require("./auth/login"));
app.use("/register", require("./auth/register"));

app.get("/", (req, res) => {
  return res.render("common/home.view.ejs")
});

app.on("close", async () => {
  await mongodbConnection.close();
});

module.exports = app;
