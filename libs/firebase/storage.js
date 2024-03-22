const { getStorage } = require("firebase/storage");

const { app } = require("./app.js");

const storage = getStorage(app);

module.exports = storage;
