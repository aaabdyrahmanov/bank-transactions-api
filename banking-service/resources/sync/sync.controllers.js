const { crudControllers } = require('../../utils/crud.js')
const { Sync } = require('./sync.model.js') 
const createAPICall = require('../../helper/createAPICall.js')
const { Balance } = require('../balance/balance.model.js')
const { Transaction } = require('../transaction/transaction.model.js')

  /**
 * @desc launches synchronization on TPP
 * @param object req - http request
 * @param object res - http response
 * @returns object - newly created sync
 */
async function launchSync (req, res) {
    const { operations } = req;
    const apiCalls = []
    let sync

    try {
      operations.map(op=> apiCalls.push(createAPICall(op)));

      // retrieve the necessary datas
      const data = await Promise.all(apiCalls)

      if (data.indexOf('fatalError') != -1) {
        const operationType = operations[data.indexOf('fatalError')].type
        req.body.data = {
          status: 'failed',
          operation: operationType,
          date: new Date()
        }

        await crudControllers(Sync).createOne(req, res)

        return res.status(500).send({ status: 'failure', message: `Oops, we're sorry. Fatal error occured while retrieving the ${operationType} data from TPP!` })
      }

      console.info('Data retrieved successfully.')

      const [transactions, balances] = data

      // operation transactions is fatal
      if (
        !transactions.length
        || !Array.isArray(transactions)
      ) {
        return res.status(410).json({ message: 'Transactions data is not available'})
      }

      await crudControllers(Transaction).createMany(transactions)

      if (balances) {
        await crudControllers(Balance).createMany(balances)
      }

      req.body.data = {
        status: 'success',
        date: Date.now()
      }
      sync = await crudControllers(Sync).createOne(req, res)

    } catch(error) {
      console.error(`Synchronization Error: ${error.message}`)
      return res.status(500).json({ message: error.message })
    }

    return res.status(201).json(sync)
}

module.exports = { 
    launchSync, 
    ...crudControllers(Sync) 
}
