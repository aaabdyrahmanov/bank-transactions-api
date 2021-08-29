const router = require('../sync.router')

describe('sync router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/init', method: 'post' },
      { path: '/terminate', method: 'post' },
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