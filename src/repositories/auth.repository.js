import User from "../models/user.model.js";

export async function createUser(user) {
  return await User.create(user);
}

export async function findUserByEmail(email) {
  return await User.findOne({ email });
}

export async function getUsers() {
  return await User.find().select({ passwordHash: 0 });
}

export async function newToken(email, resetToken, resetTokenExpiration) {
  return await User.findOneAndUpdate(
    email,
    { resetToken, resetTokenExpiration },
    { new: true }
  );
}

export async function userToReset(email, token) {
  return await User.findOne({
    resetToken: token,
    email,
    resetTokenExpiration: { $gt: Date.now() },
  });
}

export async function resetPass(email, password) {
  return await User.findOneAndUpdate(
    email,
    { passwordHash: password },
    { new: true }
  );
}

export async function clearToken(email) {
  return await User.findOneAndUpdate(
    email,
    { resetToken: null, resetTokenExpiration: null },
    { new: true }
  );
}
