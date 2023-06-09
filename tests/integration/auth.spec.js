import supertest from "supertest";
import { app } from "../../src/index.js";
import User from "../../src/models/user.model.js";
import { generateUserBody } from "../factories/auth.js";
import "dotenv/config";

beforeEach(async () => {
  await User.deleteMany();
});

describe("*** CREATE USER ***", () => {
  it("Should return status 201 when the test pass a valid user body and email is not yet registered", async () => {
    const user = generateUserBody();
    const response = await supertest(app).post("/sign-up").send(user);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("Should return status 409 when the test pass a valid user body and email is registered", async () => {
    const user = generateUserBody();
    await supertest(app).post("/sign-up").send(user);
    const response = await supertest(app).post("/sign-up").send(user);
    expect(response.status).toBe(409);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("should return 500 when the test pass a invalid user body", async () => {
    const user = {};
    const response = await supertest(app).post("/sign-up").send(user);
    expect(response.status).toBe(500);
  });
});

describe("*** LOGIN USER ***", () => {
  it("should return 200 when the test pass a valid login body", async () => {
    const newUser = generateUserBody();
    await supertest(app).post("/sign-up").send(newUser);
    const user = {
      email: "teste@teste.com.br",
      password: "123",
    };
    const response = await supertest(app).post("/sign-in").send(user);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("should return 401 when the test pass a invalid password", async () => {
    const newUser = generateUserBody();
    await supertest(app).post("/sign-up").send(newUser);
    const user = {
      email: "teste@teste.com.br",
      password: "124",
    };
    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toEqual("Invalid email and/or password");
  });
  it("should return 401 when the test pass a invalid body", async () => {
    const user = {};
    const response = await supertest(app).post("/sign-in").send(user);
    expect(response.status).toBe(401);
  });
});
