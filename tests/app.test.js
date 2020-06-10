const request = require("supertest");

const app = require("../");

test("GET /api/status", (done) => {
  return request(app)
    .get("/api/status")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .expect(({ body: res }) => {
      expect(res.dateTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
      expect(res.version).toMatch(/^\d+\.\d+\.\d+$/);
      expect(res.locale).toMatch(/^.+$/);
      expect(res.hostname).toMatch(/^.+$/);
    })
    .end(done);
});
