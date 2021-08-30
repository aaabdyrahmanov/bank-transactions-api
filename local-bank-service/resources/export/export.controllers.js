const BalanceController = require("../balance/balance.controllers");
const TransactionController = require("../transaction/transaction.controllers");
const { exportData: exportDataAsFile } = require("../../helper");

async function exportTransactions(req, res) {
  const file = { name: "transactions", type: "csv" };
  try {
    const { data } = await TransactionController.getAll(req, res);

    exportDataAsFile(res, { ...file, data });
  } catch (error) {
    console.error(`Export ${file.name} error: ${error.message}`);
    return res.status(400);
  }
}

async function exportBalances(req, res) {
  const file = { name: "balances", type: "csv" };

  try {
    const { data } = await BalanceController.getAll(req, res);

    exportDataAsFile(res, { ...file, data });
  } catch (error) {
    console.error(`Export ${file.name} error: ${error.message}`);
    return res.status(400);
  }
}

module.exports = {
  transaction: exportTransactions,
  balance: exportBalances,
};
