import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypt from "crypt";

import * as userRepository from "../repositories/auth.repository.js";
import { encryptPass } from "../utils/encryptPass.js";
import { sendResetToken } from "../utils/mail.js";

export async function createUser(user) {
  const userExist = await userRepository.findUserByEmail(user.email);

  if (userExist) return null;

  const hashedPassword = await encryptPass(user.password);

  const newUser = await userRepository.createUser({
    ...user,
    passwordHash: hashedPassword,
  });

  return newUser;
}

export async function loginUser(user) {
  const userExist = await userRepository.findUserByEmail(user.email);

  if (!userExist) return null;

  if (!bcrypt.compareSync(user.password, userExist.passwordHash)) return null;

  const expiresIn = process.env.EXPIRES_IN;
  const secretToken = process.env.SECRET_TOKEN;

  const token = jwt.sign({ user: userExist.id }, secretToken, { expiresIn });

  const returnedUser = {
    token,
    name: userExist.name,
    email: userExist.email,
  };

  return returnedUser;
}

export async function askForReset(user) {
  const expirationTime =
    Number(process.env.RESET_TOKEN_EXPIRATION_DATE) || 3600000;

  const foundUser = await userRepository.findUserByEmail(user.email);

  if (!foundUser) return null;

  const newResetToken = crypt.randomBytes(32).toString("hex");

  let newResetTokenSplited = newResetToken.split(",");

  const resetToken = [
    newResetTokenSplited[0],
    newResetTokenSplited[1],
    newResetTokenSplited[2],
  ].join("");

  const resetTokenExpiration = Date.now() + expirationTime;

  await userRepository.newToken(user.email, resetToken, resetTokenExpiration);

  await sendResetToken(foundUser.email, foundUser.firstName, resetToken);

  return { resetToken, resetTokenExpiration, name: foundUser.firstName };
}

export async function resetPass(user) {
  const userExist = await userRepository.findUserByEmail(user.email);

  if (!userExist) return null;

  const userReset = await userRepository.userToReset(
    user.email,
    userExist.resetToken
  );

  if (!userReset) return null;

  const hashedPassword = await encryptPass(user.password);

  const resetedPass = await userRepository.resetPass(
    user.email,
    hashedPassword
  );
  await userRepository.clearToken(user.email);
  return resetedPass;
}
