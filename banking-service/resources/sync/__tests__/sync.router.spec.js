const router = require('../sync.router')

describe('sync router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/launch', method: 'get' },
      { path: '/', method: 'get' },
      { path: '/', method: 'delete' }
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})