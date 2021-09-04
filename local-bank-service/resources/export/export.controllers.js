const BalanceController = require("../balances/balance.controllers");
const TransactionController = require("../transactions/transaction.controllers");
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
    const { data } = await TransactionController.getAll();

    if (!data.length) {
      return res.status(404).json({
        status: "failure",
        message: "Sorry, it looks like storage is empty. Data was not found!",
      });
    }

    const { input, transform } = exportDataAsFile({ ...file, fields, data });

    res.header("Content-Type", "text/csv");
    res.attachment(`${file.name}.${file.type}`);

    // pipe the read stream to the response object
    input.pipe(transform).pipe(res);
  } catch (error) {
    console.error(`Export ${file.name} error: ${error.message}`);
    return res.status(400).json({ status: "failure", message: error.message });
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
    const { data } = await BalanceController.getAll();

    if (!data.length) {
      return res.status(404).json({
        status: "failure",
        message: "Sorry, it looks like storage is empty. Data was not found!",
      });
    }

    const { input, transform } = exportDataAsFile({ ...file, fields, data });

    res.header("Content-Type", "text/csv");
    res.attachment(`${file.name}.${file.type}`);

    // pipe the read stream to the response object
    input.pipe(transform).pipe(res);
  } catch (error) {
    console.error(`Export ${file.name} error: ${error.message}`);
    return res.status(400).json({ status: "failure", message: error.message });
  }
}

module.exports = {
  transactions: exportTransactions,
  balances: exportBalances,
};
