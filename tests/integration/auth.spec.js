import supertest from "supertest";
import { app } from "../../src/index.js";
import User from "../../src/models/user.model.js";
import { generateUserBody } from "../factories/auth.js";

beforeEach(async () => {
  await User.deleteMany();
});

describe("POST /sign-up", () => {
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
});
