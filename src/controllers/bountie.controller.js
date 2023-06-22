import * as bountieService from "../services/bountie.services.js";

export async function createBountie(req, res) {
  const bountie = req.body;
  const user = res.locals;
  await bountieService.createBountie(bountie, user);
  return res.status(201).json({ message: "Bountie created" });
}

export async function getBounties(_req, res) {
  const bounties = await bountieService.getBounties();
  return res.status(200).json(bounties);
}

export async function getMyBounties(_req, res) {
  const user = res.locals;
  const bounties = await bountieService.getMyBounties(user);
  return res.status(200).json(bounties);
}

export async function getBountie(req, res) {
  const id = req.params.id;
  const bountie = await bountieService.getBountie(id);
  return res.status(200).json(bountie);
}

export async function editBountie(req, res) {
  const user = res.locals;
  const id = req.params.id;
  const editedBountie = req.body;
  const bountie = await bountieService.editBountie(id, editedBountie, user);
  return res.status(200).json(bountie);
}
