const mongoose = require("mongoose");

const balancesSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.Balance = mongoose.model("balances", balancesSchema);
