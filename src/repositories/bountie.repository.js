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

export async function getBountie(id) {
  return await Bountie.find({ _id: id }).populate("answers user collab");
}

export async function editBountie(id, editedBountie, user) {
  return await Bountie.findOneAndUpdate(
    { _id: id, user: user },
    editedBountie,
    {
      new: true,
    }
  );
}
