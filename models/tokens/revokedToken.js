const mongoose = require("mongoose");

const revokeTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    indexes: [
      {
        fields: { expiresAt: 1 },
        expireAfterSeconds: 0,
      },
    ],
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

const RevokeToken = mongoose.model("RevokedToken", revokeTokenSchema);

module.exports = RevokeToken;
