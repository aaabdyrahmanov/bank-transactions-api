const router = require("../transaction.router");

describe("transaction router", () => {
  test("has crud routes", () => {
    const routes = [{ path: "/", method: "get" }];

    routes.forEach((route) => {
      const match = router.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
