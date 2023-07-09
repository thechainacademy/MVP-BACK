import { NotFoundBountie } from "../errors/index.js";
import * as bountieRepositorie from "../repositories/bountie.repository.js";

export async function createAnswer(user, answer) {
  const bountie = await bountieRepositorie.getBountie(answer.bountie);
  if (!bountie) throw NotFoundBountie();
  await answerRepositorie.createAnswer(user, answer);
}
