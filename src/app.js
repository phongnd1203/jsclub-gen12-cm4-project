const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const RedisStore = require("connect-redis").default;

const app = express();
const redisClient = require("./databases/init.redis.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "static")));
app.use(
  session({
    name: "sid",
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      client: redisClient,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
    },
  }),
);

app.use("/login", require("./routes/auth/login.route"));
app.use("/register", require("./routes/auth/register.route"));

module.exports = app;
