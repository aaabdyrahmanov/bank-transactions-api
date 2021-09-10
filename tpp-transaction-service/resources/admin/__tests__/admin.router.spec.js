const router = require("../admin.router");

describe("admin router", () => {
  test("has health route", () => {
    const routes = [{ path: "/health", method: "get" }];

    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
