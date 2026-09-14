import type { Request, Response, NextFunction } from "express";
import { NewUserSchema, UserSchema } from "../types.ts";
import db from "../../config/drizzle.ts";
import { usersTable } from "../db/schema.ts";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const createUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { email, password, fullName } = NewUserSchema.parse(req.body);
  console.log({ email, password, fullName });
  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(usersTable).values({ email, passwordHash, fullName });
  next();
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = UserSchema.parse(req.body);

  const [user] = [
    ...(await db.select().from(usersTable).where(eq(usersTable.email, email))),
  ];

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY || "secretKey",
    { expiresIn: "14d" },
  );

  // console.log(req.body);
  // console.log(".body");

  //   let message = null;
  // if (req.body.name) {
  //   message = "Registration successful!, logging you in";
  // } else {
  //   message = "Welcome, logging you in";
  // }

  // console.log({ user });

  return res.status(200).json({
    token: `Bearer ${token}`,
    userId: user.id,
    email: user.email,
    fullname: user.fullName,
  });
};

export default { createUser, signIn };
