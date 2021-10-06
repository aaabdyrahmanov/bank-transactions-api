const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    counterpart_name: {
      type: String,
      required: true,
    },
    counterpart_iban: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.Transaction = mongoose.model("transactions", transactionsSchema);
