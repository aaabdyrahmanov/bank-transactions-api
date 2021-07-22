const router = require('express').Router()
const controllers = require('./transaction.controllers.js')

/**
    /v1/transactions
 */
router
    .route('/')
    .get(controllers.getMany)
    .post(controllers.createAll)
    .delete(controllers.removeMany)

module.exports = router