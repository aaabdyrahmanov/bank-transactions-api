const BalanceController = require('../balance/balance.controllers')
const TransactionController = require('../transaction/transaction.controllers')
const { convertResource } = require('../../utils/resourceConvertor.js') 

async function exportTransactions (req, res, configs=config.transaction) {
  const { fields, filename } = {
    fields: [
      {
        label: 'Transaction Id',
        value: '_id'
      },
      {
        label: 'Transaction Id',
        value: 'id'
      },
      {
        label: 'Amount',
        value: 'amount'
      },
      {
        label: 'Counterpart Name',
        value: 'counterpart_name'
      },
      {
        label: 'Counterpart IBAN',
        value: 'counterpart_iban'
      },
      {
        label: 'Date',
        value: 'date'
      },
      {
        label: 'Retrieved Date',
        value: 'createdAt'
      }
    ],
    filename: 'transaction.csv'
  }

  try {
      const { data } = await TransactionController.getAll(req, res)

      const csv = convertResource(fields, data);

      res.header('Content-Type', 'text/csv');
      res.attachment(filename);

      return res.status(200).send(csv);
    } catch(error) {
    console.error(`Export Error: ${error}`)
    return res.status(400)
  }
}

async function exportBalances (req, res) {
  const { fields, filename } = {
      fields: [
        {
            label: 'Balance Id',
            value: '_id'
        },
        {
          label: 'Balance amount',
          value: 'amount'
        },
        {
          label: 'Transaction Date',
          value: 'date'
        },
        {
          label: 'Retrieved Date',
          value: 'createdAt'
        }
      ],
      filename: 'transaction.csv'
    }

    try {
      const { data } = await BalanceController.getAll(req, res)

      const csv = convertResource(fields, data);

      res.header('Content-Type', 'text/csv');
      res.attachment(filename);

      return res.status(200).send(csv);
    } catch(error) {
      console.error(`Export Error: ${error.message}`)
      return res.status(400)
    }
}

module.exports = {
    transaction: exportTransactions,
    balance: exportBalances
}