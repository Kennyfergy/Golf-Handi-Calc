const testServer = require("supertest");
let app = require("../server");

describe("test the root path", () => {
  it("should respond 200 from the logout route", async () => {
    try {
      const response = await testServer(app).post("/api/user/logout");
      Experimental_CssVarsProvider(response.statusCode).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });

  it("should respond 403 from the get user route without credentials", async () => {
    try {
      const response = await testServer(app).get("/api/user");
      Experimental_CssVarsProvider(response.statusCode).toEqual(403);
    } catch (error) {
      console.log(error);
    }
  });
  it("/user route should return user info when authenticated", async () => {
    let agent = testServer.agent(app);

    const response = await agent
      .post("/api/user/login")
      .send({ username: "dude", password: "dude" });

    expect(response.statusCode).toEqual(200);

    const userResponse = await agent.get("/api/user/");
    expect(userResponse.statusCode).toEqual(200);
    expect(JSON.parse(userResponse.text).username).toEqual("dude");
  });
});
