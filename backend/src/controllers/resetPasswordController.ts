import { type Request, type Response } from "express";
import {
  ResetPasswordSchema,
  NewPasswordSchema,
  ResetTokenSchema,
} from "../types.ts";
import db from "../../config/drizzle.ts";
import { usersTable } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import transporter from "../../config/mailtransport.ts";
import nodemailer from "nodemailer";
import * as jose from "jose";
import bcrypt from "bcryptjs";

const PASSWORD_RESET_SECRET = new TextEncoder().encode(
  process.env.PASSWORD_RESET_KEY || "secretKey",
);

const sendResetLink = async (req: Request, res: Response) => {
  const { email } = ResetPasswordSchema.parse(req.body);

  const userId = [
    ...(await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))),
  ][0].id;
  
  const token = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(PASSWORD_RESET_SECRET);

  const info = await transporter.sendMail({
    from: '"Test Sender" <test@example.com>',
    to: "recipient@example.com",
    subject: `${process.env.HOME_DOMAIN}/reset-password?token=${token}`,
    text: "This is a test email sent via Ethereal!",
    html: "<p>This is a <b>test email</b> sent via Ethereal!</p>",
  });

  console.log("Message sent: %s", info.messageId);

  // Get the Ethereal URL to preview this email
  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log("Preview URL: %s", previewUrl);
  // Output: https://ethereal.email/message/...

  res.end();
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
