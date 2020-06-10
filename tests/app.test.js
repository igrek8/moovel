const request = require("supertest");

const app = require("../");

const regexISODate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

const statusMatcher = {
  dateTime: expect.stringMatching(regexISODate),
  version: expect.stringMatching(/^.+$/),
  locale: expect.stringMatching(/^.+$/),
  hostname: expect.stringMatching(/^.+$/),
};

const dataMatcher = expect.objectContaining({
  users: expect.arrayContaining([
    expect.objectContaining({
      username: expect.any(String),
      url: expect.any(String),
      avatarUrl: expect.any(String),
      followersCount: expect.any(Number),
      name: expect.any(String),
    }),
  ]),
});

const emptyDataMatcher = { users: [] };

describe("{...} - data set, {   } - zero set, {err} - error", () => {
  test("GET 200 {...} /api/status", (done) => {
    return request(app)
      .get("/api/status")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(({ body: res }) => expect(res).toEqual(statusMatcher))
      .end(done);
  });

  test("GET 422 {err} /api/users (when no params)", (done) => {
    return request(app)
      .get("/api/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(422)
      .end(done);
  });

  test("GET 200 {...} /api/users (when known lang)", (done) => {
    return request(app)
      .get("/api/users?langs[]=js")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(({ body: res }) => expect(res).toEqual(dataMatcher))
      .end(done);
  });

  test("GET 200 {   } /api/users (when unknown lang)", (done) => {
    return request(app)
      .get("/api/users?langs[]=myscript")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(({ body: res }) => expect(res).toEqual(emptyDataMatcher))
      .end(done);
  });

  test("GET 200 {...} /api/users (when unknown lang and fallback lang)", (done) => {
    return request(app)
      .get("/api/users?langs[]=myscript&langs[]=js")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(({ body: res }) => expect(res).toEqual(dataMatcher))
      .end(done);
  });

  test("GET 200 {   } /api/users (when user and lang but user has no repos with the lang)", (done) => {
    return request(app)
      .get("/api/users?username=torvalds&langs[]=js")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(({ body: res }) => expect(res).toEqual(emptyDataMatcher))
      .end(done);
  });

  test("GET 200 {...} /api/users (when user and lang and fallback lang)", (done) => {
    return request(app)
      .get("/api/users?username=torvalds&langs[]=js&langs[]=c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(({ body: res }) => expect(res).toEqual(dataMatcher))
      .end(done);
  });
});
