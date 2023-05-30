import nodemailer from "nodemailer";
import "dotenv/config";

async function createTransporter() {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  return transporter;
}

export async function sendNewUserMail(newUser) {
  try {
    let transporter = await createTransporter();
    return await transporter.sendMail({
      from: transporter.options.auth.user,
      to: newUser.email,
      subject: "Chain-academy register",
      text: `Hello ${newUser.firstName} your registration was successfully completed in the chain academy system.`,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function sendResetToken(email, name, token) {
  try {
    const transporter = await createTransporter();
    return await transporter.sendMail({
      from: transporter.options.auth.user,
      to: email,
      subject: "Reset Password Token",
      text: `Hello ${name} your token to reset your password is: ${token}.`,
    });
  } catch (err) {
    console.log(err);
  }
}
