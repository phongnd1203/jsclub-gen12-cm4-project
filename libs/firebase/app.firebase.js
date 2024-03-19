const firebaseApp = require("firebase/app");

const { config } = require("../../configs/app.config.js");

const app = firebaseApp.initializeApp(config.firebase);

module.exports = app;
