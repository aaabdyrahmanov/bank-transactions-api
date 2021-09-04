const request = require("supertest");
const app = require("../server");

describe("GET /", () => {
  it("return Not Found response", () => request(app).get("/").expect(404));
});

describe("GET /api/health", () => {
  it("return server health status", () =>
    request(app).get("/api/health").expect(200).expect("Content-Type", /json/));
});
