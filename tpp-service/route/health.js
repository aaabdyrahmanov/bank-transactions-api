const router = require('express').Router()

/**
  /api/health
 */
router.use('/health', (req, res) => {
  let health

  try {
    health = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    }
  } catch (error) {
    console.error(error)
    return res.status(503).send({ status: 'failure', message: 'Sorry, something went wrong. Service Unavailable!' })
  }

  return res.status(200).send(health)
})

module.exports = router
