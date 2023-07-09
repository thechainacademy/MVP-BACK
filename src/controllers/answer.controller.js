import * as answerService from "../services/answer.services.js";

export async function createAnswer(req, res) {
  const user = res.locals;
  const answer = req.body;
  console.log(user, answer);
  await answerService.createAnswer(user, answer);
  return res
    .status(201)
    .json({ message: `Answer created to bountie ${answer.bountie}` });
}
