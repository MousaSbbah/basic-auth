"use strict";
const server = require("../src/server.js");
const supergoose = require("@code-fellows/supergoose");
const request = supergoose(server.server);
const base64 = require("base-64");

describe("/signup Router", () => {
  let newUser = {
    username: "Mousa",
    password: "123456",
  };
  let wrongUser = {
    username: "",
    password: "123456",
  };
  it("should create a new user ", async () => {
    const response = await request.post("/signup").send(newUser);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual("Mousa");
    expect(response.body.password).toBeTruthy();
  });
  it("if there is no username in the body it should return error ", async () => {
    const response = await request.post("/signup").send(wrongUser);
    expect(response.status).toEqual(403);
    expect(response.body.error).toEqual(
      "user validation failed: username: Path `username` is required."
    );
  });
});
describe("/signin Router", () => {
  let newUser = {
    username: "Mousa",
    password: "123456",
  };

  it("should sign in with correct username and password", async () => {
    const response = await request
      .post("/signin")
      .auth(newUser.username, newUser.password);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual("Mousa");
    expect(response.body.password).toBeTruthy();
  });
  it("should sign in with wrong username ", async () => {
    const response = await request
      .post("/signin")
      .auth("Mousaa", newUser.password);
    expect(response.body.status).toEqual("401");
    expect(response.body.message).toEqual("Invalid  username");
  });
  it("should sign in with correct username and wrong password", async () => {
    const response = await request
      .post("/signin")
      .auth(newUser.username, "aaa");
    expect(response.body.status).toEqual("401");
    expect(response.body.message).toEqual("Invalid password ");
  });
  it("should sign in with correct username and wrong password", async () => {
    const response = await request.post("/signin");
    expect(response.status).toEqual(401);
  });
});
