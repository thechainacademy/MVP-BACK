import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypt from "crypt";

import * as userRepository from "../repositories/auth.repository.js";
import { encryptPass } from "../utils/encryptPass.js";
import { sendResetToken } from "../utils/mail.js";
import {
  Conflict,
  LoginError,
  NotFoundUser,
  TokenExpired,
} from "../errors/index.js";

export async function createUser(user) {
  const userExist = await userRepository.findUserByEmail(user.email);

  if (userExist) throw Conflict();

  const hashedPassword = await encryptPass(user.password);

  const newUser = await userRepository.createUser({
    ...user,
    passwordHash: hashedPassword,
  });

  return newUser;
}

export async function loginUser(user) {
  const userExist = await userRepository.findUserByEmail(user.email);

  if (!userExist) throw LoginError();

  if (!bcrypt.compareSync(user.password, userExist.passwordHash))
    throw LoginError();

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
  console.log(foundUser);
  if (!foundUser) throw NotFoundUser();

  const newResetToken = crypt.randomBytes(32).toString("hex");

  let newResetTokenSplited = newResetToken.split(",");

  const resetToken = [
    newResetTokenSplited[0],
    newResetTokenSplited[1],
    newResetTokenSplited[2],
  ].join("");

  const resetTokenExpiration = Date.now() + expirationTime;

  const u = await userRepository.newToken(
    user.email,
    resetToken,
    resetTokenExpiration
  );
  console.log(u);
  await sendResetToken(foundUser.email, foundUser.firstName, resetToken);

  return { resetToken, resetTokenExpiration, name: foundUser.firstName };
}

export async function resetPass(user) {
  const userExist = await userRepository.findUserByEmail(user.email);
  console.log(userExist.resetToken);

  if (!userExist) throw NotFoundUser();

  const userReset = await userRepository.userToReset(
    user.email,
    userExist.resetToken
  );
  if (!userReset) throw TokenExpired();

  const hashedPassword = await encryptPass(user.password);

  const resetedPass = await userRepository.resetPass(
    user.email,
    hashedPassword
  );
  await userRepository.clearToken(user.email);
  return resetedPass;
}
