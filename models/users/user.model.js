const mongoose = require("mongoose");

const userRoles = require("../../constants/enums/userRoles.enum.js");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: Object.keys(userRoles),
      default: "user",
    },
  
    following:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}]
  
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
