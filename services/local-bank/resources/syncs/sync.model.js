const mongoose = require("mongoose");

const syncsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "succeed", "failed"],
      default: "pending",
    },
    operation: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports.Sync = mongoose.model("syncs", syncsSchema);
