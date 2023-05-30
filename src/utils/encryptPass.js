import "dotenv/config";
import bcrypt from "bcrypt";

export async function encryptPass(pass) {
  const numberOfSalts = Number(process.env.SALTS);
  const salt = bcrypt.genSaltSync(numberOfSalts);

  const hashedPassword = bcrypt.hashSync(pass, salt);
  return hashedPassword;
}
