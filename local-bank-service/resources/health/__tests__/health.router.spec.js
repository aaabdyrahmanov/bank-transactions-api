const router = require('../health.router')

describe('health router', () => {
  test('has health check route', () => {
    const routes = [
      { path: '/health', method: 'get' },
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})