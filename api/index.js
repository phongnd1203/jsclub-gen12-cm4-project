const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const timeout = require("connect-timeout");

const morgan = require("morgan");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongodbConnection = require("../databases/mongodb.js");

const { config } = require("../configs/appConfig.js");

const app = express();

app.use(morgan(config.morgan.format));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(
  express.static(path.join(__dirname, "../public"), {
    maxAge: config.app.isProduction ? 1000 * 60 * 60 * 24 * 7 : 0,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: "sid",
    secret: config.app.session.secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
    store: new MongoStore({
      client: mongodbConnection.getClient(),
      collectionName: "sessions",
      ttl: 60 * 60 * 24 * 14,
      autoRemove: "native",
      autoRemoveInterval: 10,
      crypto: {
        secret: config.mongodb.session.storage.secret,
      },
    }),
  }),
);

app.use(require("../middlewares/dataLoader.js"));

app.use("/", require("./home"));
app.use("/auth", require("./auth"));
app.use("/user", require("./user"));
app.use("/users", require("./users"));
app.use("/houses", require("./houses"));

app.use(require("../middlewares/errorHandler.js"));

app.on("close", async () => {
  await mongodbConnection.close();
});

module.exports = app;
