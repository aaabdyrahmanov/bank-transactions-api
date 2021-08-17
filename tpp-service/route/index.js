const router = require('express').Router()

const docs = require('./documentation')
const health = require('./health')

router.use('/api', docs)
router.use('/api', health)

module.exports = router