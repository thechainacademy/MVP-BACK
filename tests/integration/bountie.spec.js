import supertest from "supertest";
import { app } from "../../src/index.js";
import { generateUserBody, userLogin } from "../factories/auth.js";
import "dotenv/config";
import Bountie from "../../src/models/bountie.model.js";
import {
  createGenericBountie,
  createGenericInvalidBountie,
} from "../factories/bountie.js";
import User from "../../src/models/user.model.js";

beforeEach(async () => {
  await User.deleteMany();
  await Bountie.deleteMany();
});

describe("*** POST NEW BOUNTIE ***", () => {
  it("Should return status 201 when the test pass a valid bountie body and user is logged", async () => {
    const token = await userLogin();
    const newBountie = createGenericBountie();
    const response = await supertest(app)
      .post("/bountie")
      .send(newBountie)
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Should be return status 500 when the test pass a invalid bountie body and user is logged", async () => {
    const token = await userLogin();
    const newBountie = createGenericInvalidBountie();
    const response = await supertest(app)
      .post("/bountie")
      .send(newBountie)
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Should be return status 401 when the test pass a valid bountie body and user is not logged", async () => {
    const newBountie = createGenericInvalidBountie();
    const response = await supertest(app).post("/bountie").send(newBountie);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("*** GET ALL BOUNTIES ***", () => {
  it("Should be return status 200 and an array with all bounties when the test pass a user logged", async () => {
    const token = await userLogin();
    const response = await supertest(app)
      .get("/bountie")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("Should be return status 401 and an array with all bounties when the test pass a user not logged", async () => {
    const response = await supertest(app).get("/bountie");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("*** GET MY BOUNTIES ***", () => {
  it("Should be return status 200 and an array with all of my bounties", async () => {
    const token = await userLogin();
    const newBountie = createGenericBountie();
    await supertest(app)
      .post("/bountie")
      .send(newBountie)
      .set("Authorization", "bearer " + token);
    const response = await supertest(app)
      .get("/my-bounties")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
