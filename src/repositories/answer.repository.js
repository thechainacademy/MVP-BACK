import Answer from "../models/answer.model.js";

export async function createAnswer(user, answer) {
  return await Answer.create({
    answer: answer.answer,
    bountie: answer.bountie,
    user: user,
  });
}
