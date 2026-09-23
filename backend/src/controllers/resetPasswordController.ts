import { type Request, type Response } from "express";
import {
  ResetPasswordSchema,
  NewPasswordSchema,
  ResetTokenSchema,
} from "../types.ts";
import db from "../../config/drizzle.ts";
import { usersTable } from "../db/schema.ts";
import { eq } from "drizzle-orm";
// import transporter from "../../config/mailtransport.ts";
// import nodemailer from "nodemailer";
import * as jose from "jose";
import bcrypt from "bcryptjs";
import emailjs from "../../config/emailConfig.ts";

const PASSWORD_RESET_SECRET = new TextEncoder().encode(
  process.env.PASSWORD_RESET_KEY || "secretKey",
);

const sendResetLink = async (req: Request, res: Response) => {
  try {
    const { email } = ResetPasswordSchema.parse(req.body);
    let userId: string;

    const user = [
      ...(await db
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(eq(usersTable.email, email))),
    ][0];

    if (user) {
      userId = user.id;
      // console.log(userId);
      const token = await new jose.SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("2h")
        .sign(PASSWORD_RESET_SECRET);
      const templateParams = {
        name: "bookmark app",
        message: `${process.env.HOME_DOMAIN}/reset-password?token=${token}`,
        time: new Date(),
        recipientEmail: email,
      };
      emailjs.send("bookmark_service", "bookmark_message", templateParams).then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        },
      );
      res.end();
    } else {
      res.status(404).send({message:"User not found"});
    }
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req: Request, res: Response) => {
  const { token } = ResetTokenSchema.parse(req.params);
  const { newPassword } = NewPasswordSchema.parse(req.body);

  // console.log({ newPassword, token });

  try {
    const value = await jose.jwtVerify(token, PASSWORD_RESET_SECRET);
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db
      .update(usersTable)
      .set({ passwordHash })
      .where(eq(usersTable.id, value.payload.userId as string));
  } catch (error) {
    if (error instanceof jose.errors.JOSEError) {
      console.log(error);
      console.log(error.code);
    }
  }
  res.end();
};

export default { sendResetLink, changePassword };
