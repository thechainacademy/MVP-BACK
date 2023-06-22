import { NotFoundBountie } from "../errors/index.js";
import * as bountieRepository from "../repositories/bountie.repository.js";

export async function createBountie(bountie, user) {
  return await bountieRepository.createBountie(bountie, user);
}

export async function getBounties() {
  return await bountieRepository.getBounties();
}

export async function getMyBounties(user) {
  return await bountieRepository.getMyBounties(user);
}

export async function getBountie(id) {
  const bountie = await bountieRepository.getBountie(id);
  if (!bountie.length) throw NotFoundBountie();
  return bountie;
}

export async function editBountie(id, editedBountie, user) {
  const bountie = await bountieRepository.editBountie(id, editedBountie, user);
  if (!bountie) throw NotFoundBountie();
  return bountie;
}
