const { initializeApp } = require("firebase/app");

const { config } = require("../../configs/appConfig.js");

const app = initializeApp(config.google.firebase);

module.exports = app;
