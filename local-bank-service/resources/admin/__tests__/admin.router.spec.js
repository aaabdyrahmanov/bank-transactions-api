const router = require('../admin.router')

describe('admin router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/health', method: 'get' },
      { path: '/cache', method: 'delete' },
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})