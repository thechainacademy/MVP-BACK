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
