"use strict";
const server = require("../src/server.js");
const supertest = require("supertest");
const request = supertest(server.server);

describe("404 Error Handler", () => {
  it("Should return 404 for bad rout", async () => {
    const response = await request.get("/badRout");
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Not Found");
  });
  it("Should return 404 for bad method", async () => {
    const response = await request.delete("/signin");
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Not Found");
  });
});

describe("500 Error Handler", () => {
  it("should Update the animal information", async () => {
    const response = await request.get(`/bad`);
    expect(response.status).toEqual(500);
  });
});
