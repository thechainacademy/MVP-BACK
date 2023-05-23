import User from "../models/user.model";

export async function createUser(user) {
  return await User.create(user);
}

export async function findUserByEmail(email) {
  return await User.findOne({ email });
}

export async function getUsers() {
  return await User.find().select({ passwordHash: 0 });
}
