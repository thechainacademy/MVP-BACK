import supertest from "supertest";
import { app } from "../../src";

export function generateUserBody() {
  return {
    firstName: "Felipe",
    lastName: "Santos",
    email: "teste@teste.com.br",
    password: "123",
    language: "PT-BR",
    skills: "JavaScript",
    description: "JavaScript Mentor",
    birth: "07/29/1988",
  };
}

export function bodyLogin() {
  return {
    email: "teste@teste.com.br",
    password: "123",
  };
}

export async function userLogin() {
  const newUser = generateUserBody();
  await supertest(app).post("/sign-up").send(newUser);
  const userLogin = bodyLogin();
  const response = await supertest(app).post("/sign-in").send(userLogin);
  const userToken = response.body.token;
  console.log(userToken);
  return userToken;
}
