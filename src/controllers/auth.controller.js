import * as userService from "../services/auth.services.js";
import { sendNewUserMail } from "../utils/mail.js";

export async function createUser(req, res) {
  try {
    const user = req.body;
    const userExist = await userService.createUser(user);
    if (!userExist)
      return res.status(409).json({ message: "User already registered" });
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const user = req.body;
    const confirmedUser = await userService.loginUser(user);
    if (!confirmedUser) {
      return res.status(401).json({ message: "Invalid email and/or password" });
    }
    res.status(200).json(confirmedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
