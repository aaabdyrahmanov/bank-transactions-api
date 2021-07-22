const { crudControllers } = require('../../utils/crud.js')
const { Transaction } = require('./transaction.model.js') 

async function createAll (req, res) {
    let { data } = req.body
    try {
      if (!data) {
        return res.status(400).json({ status: 'failure', message: 'Missing request body' })
      }
      
      transactions = await crudControllers(Transaction).createMany(data)

      return res.status(201).json(transactions)
    } catch(error) {
      console.error(`Transaction Error: ${error.message}`)
      return res.status(500).json({ message: error.message })
    }
}

module.exports = { 
    createAll,
    ...crudControllers(Transaction) 
}