const fs = require("fs");
const BalanceController = require("../balance/balance.controllers");
const TransactionController = require("../transaction/transaction.controllers");

async function exportTransactions(req, res) {
  try {
    const { data } = await TransactionController.getAll(req, res);

    const writable = fs.createWriteStream("./transactions.csv");

    writable.on("finish", () => {
      console.log("Transactions exporting completed!");
    });
    writable.write(data.toString());
    writable.end("Stream writing done!");

    return res.status(200).send({
      status: "success",
      message: "Transactions data exported successfully!",
    });
  } catch (err) {
    console.error(`Export Error: ${err.message}`);
    return res.status(400);
  }
}

async function exportBalances(req, res) {
  try {
    const { data } = await BalanceController.getAll(req, res);

    const writable = fs.createWriteStream("./balances.csv");

    writable.on("finish", () => {
      console.log("Balances exporting completed!");
    });
    writable.write(data.toString());
    writable.end("Stream writing done!");

    return res.status(200).send({
      status: "success",
      message: "Balances data exported successfully!",
    });
  } catch (err) {
    console.error(`Export Error: ${err.message}`);
    return res.status(400);
  }
}

module.exports = {
  transaction: exportTransactions,
  balance: exportBalances,
};
