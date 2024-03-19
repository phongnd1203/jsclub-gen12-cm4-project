const firebaseStorage = require("firebase/storage");

const app = require("./app.firebase.js");

const storage = firebaseStorage.getStorage(app);

module.exports = storage;
