const path = require("path");

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");

const MongoStore = require("connect-mongo");
const mongodbConnection = require("../databases/init.mongodb.js");
const { error } = require("console");

const { config } = require("../configs/app.config.js");

const app = express();

app.use(morgan(config.morgan.format));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));

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

app.use(require("../middlewares/districts/loadDistricts.middleware.js"));

app.use("/", require("./home"));
app.use("/auth", require("./auth"));
app.use("/house", require("./houses"));
app.use("/user", require("./users"));

// Test error handling
app.get("/error", (req, res) => {
  const { StatusCodes } = require("http-status-codes");
  const HttpException = require("../utils/httpException.js");

  throw new HttpException(
    StatusCodes.BAD_REQUEST,
    "Thông tin đã nhập không hợp lệ",
    [
      {
        message: "Title is required",
      },
    ],
  );
});

app.post("/error", (req, res) => {
  const { StatusCodes } = require("http-status-codes");
  const HttpException = require("../utils/httpException.js");

  throw new HttpException(
    StatusCodes.BAD_REQUEST,
    "Thông tin đã nhập không hợp lệ",
    [
      {
        message: "Title is required",
      },
    ],
  );
});

app.use(require("../middlewares/errors/errorHandler.middleware.js"));

app.on("close", async () => {
  await mongodbConnection.close();
});

module.exports = app;
