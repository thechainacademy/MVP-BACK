import Bountie from "../models/bountie.model.js";

export async function createBountie(bountie, user) {
  return await Bountie.create({
    ...bountie,
    user: user,
  });
}

export async function getBounties() {
  return await Bountie.find().populate("user collab");
}

export async function getMyBounties(user) {
  return await Bountie.find({ user: user }).populate("collab");
}
