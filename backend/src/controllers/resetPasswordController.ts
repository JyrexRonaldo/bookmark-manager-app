import { type Request, type Response } from "express";
import { ResetPasswordSchema } from "../types.ts";
import db from "../../config/drizzle.ts";
import { usersTable, passwordResetTokenTable } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import transporter from "../../config/mailtransport.ts";
import nodemailer from "nodemailer";

// import { ZodError } from "zod";
const PASSWORD_RESET_KEY = process.env.PASSWORD_RESET_KEY || "secretKey";

const sendResetLink = async (req: Request, res: Response) => {
  const { email } = ResetPasswordSchema.parse(req.body);

  const token = await db.transaction(async (tx) => {
    const user = [
      ...(await tx
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))),
    ][0];
    const token = jwt.sign(
      { name: user.fullName, email: user.email },
      PASSWORD_RESET_KEY,
      { expiresIn: "2m" },
    );
    await tx.insert(passwordResetTokenTable).values({ userId: user.id, token });
    return token;
  });
  console.log(token);

  const info = await transporter.sendMail({
    from: '"Test Sender" <test@example.com>',
    to: "recipient@example.com",
    subject: "Email reset link",
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



export default { sendResetLink, };