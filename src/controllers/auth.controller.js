import * as userService from "../services/auth.services.js";
import { sendNewUserMail } from "../utils/mail.js";

export async function createUser(req, res) {
  const user = req.body;
  await userService.createUser(user);

  const mail = await sendNewUserMail(user);
  if (mail) {
    return res.status(201).json({
      message: "User registred",
      name: user.name,
      email: user.email,
    });
  }
  if (!mail) {
    return res.status(201).json({
      message:
        "User successfully registered, but email not sent due to server failure",
      name: user.name,
      email: user.email,
    });
  }
}

export async function loginUser(req, res) {
  const user = req.body;
  const confirmedUser = await userService.loginUser(user);

  res.status(200).json(confirmedUser);
}

export async function askForReset(req, res) {
  const user = req.body;
  const foundUser = await userService.askForReset(user);
  return res.status(200).json({
    message: `Sending email with reset Token for user ${foundUser.name}`,
  });
}

export async function resetPass(req, res) {
  const user = req.body;
  await userService.resetPass(user);

  return res.status(200).json({
    message: "Password changed",
  });
}
