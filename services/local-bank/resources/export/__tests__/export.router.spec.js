const router = require('../export.router')

describe('export router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/transactions', method: 'get' },
      { path: '/balances', method: 'get' }
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})