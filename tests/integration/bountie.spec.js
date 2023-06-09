import supertest from "supertest";
import { app } from "../../src/index.js";
import { generateUserBody } from "../factories/auth.js";
import "dotenv/config";
import Bountie from "../../src/models/bountie.model.js";

beforeEach(async () => {
  await Bountie.deleteMany();
});

describe("*** POST NEW BOUNTIE ***", () => {
  it("Should return status 201 when the test pass a valid bountie body and user is logged", async () => {
    //
  });
});
