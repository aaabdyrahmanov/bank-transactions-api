const router = require('express').Router()
const controllers = require('./export.controllers')

/**
    /v1/export/transaction
 */
router
    .route('/transaction')
    .get(controllers.transaction)

/**
    /v1/export/balance
 */
router
    .route('/balance')
    .get(controllers.balance)

    
module.exports = router