const router = require('express').Router()
const controllers = require('./balance.controllers.js')

/**
    /v1/balance
 */
router
    .route('/')
    .get(controllers.getMany)
    .post(controllers.createAll)
    .delete(controllers.removeMany)

module.exports = router