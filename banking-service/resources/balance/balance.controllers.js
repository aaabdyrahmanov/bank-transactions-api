const { crudControllers } = require('../../utils/crud.js')
const { Balance } = require('./balance.model.js') 

async function createAll (req, res) {
    let { data } = req.body

    try {
      if (!data) {
        return res.status(400).json({ status: 'failure', message: 'Missing request body' })
      }
      
      const balances = await crudControllers(Balance).createMany(data)
        
      return res.status(201).json(balances)
    } catch(error) {
      console.error(`Balance Error: ${error.message}`)
      return res.status(500).json({ message: error.message })
    }
}


module.exports = { 
    createAll, 
    ...crudControllers(Balance) 
}