const mongoose = require("mongoose");

const firebaseStorage = require("firebase/storage");
const storage = require("../../libs/firebase/storage.firebase.js");

const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

filesSchema.index({ name: "text" });
