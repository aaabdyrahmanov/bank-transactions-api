const BalanceController = require("../balance/balance.controllers");
const TransactionController = require("../transaction/transaction.controllers");
const { exportData: exportDataAsFile } = require("../../helper");

async function exportTransactions(req, res) {
  const file = { name: "transactions", type: "csv" };
  const fields = [
    {
      label: "TransactionId",
      value: "id",
    },
    {
      label: "Amount",
      value: "amount",
    },
    {
      label: "Counterpart Name",
      value: "counterpart_name",
    },
    {
      label: "Counterpart IBAN",
      value: "counterpart_iban",
    },
    {
      label: "Execution Date",
      value: "date",
    },
    {
      label: "Created Date",
      value: "createdAt",
    },
  ];

  try {
    const { data } = await TransactionController.getAll(req, res);

    exportDataAsFile(res, { ...file, fields, data });
  } catch (error) {
    console.error(`Export ${file.name} error: ${error.message}`);
    return res.status(400);
  }
}

async function exportBalances(req, res) {
  const file = { name: "balances", type: "csv" };
  const fields = [
    {
      label: "BalanceId",
      value: "_id",
    },
    {
      label: "Amount",
      value: "amount",
    },
    {
      label: "Execution Date",
      value: "date",
    },
    {
      label: "Created Date",
      value: "createdAt",
    },
  ];

  try {
    const { data } = await BalanceController.getAll(req, res);

    exportDataAsFile(res, { ...file, fields, data });
  } catch (error) {
    console.error(`Export ${file.name} error: ${error.message}`);
    return res.status(400);
  }
}

module.exports = {
  transaction: exportTransactions,
  balance: exportBalances,
};
