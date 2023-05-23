import nodemailer from "nodemailer";
import "dotenv/config";

const user = process.env.NODEMAILER_EMAIL;
const pass = process.env.NODEMAILER_PASS;
let transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: Number(process.env.NODEMAILER_PORT),
  auth: { user, pass },
});

export async function sendNewUserMail(newUser) {
  try {
    return await transporter.sendMail({
      from: user,
      to: newUser.email,
      subject: "Chain-academy register",
      text: `Hello ${newUser.name} your registration was successfully completed in the chain academy system.`,
    });
  } catch (err) {
    console.log(err);
  }
}
