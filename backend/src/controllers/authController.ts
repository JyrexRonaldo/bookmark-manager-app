import type { Request, Response } from "express";
import { NewUserSchema } from "../types.ts";
import db from "../../config/drizzle.ts";
import { usersTable } from "../db/schema.ts";
import bcrypt from "bcryptjs";

// const addBookmark = async (req: Request, res: Response) => {
//   try {
//     const { id, title, description, url, tags, createdAt } =
//       NewBookmarkEntrySchema.parse(req.body);
//     const faviconUrl = new URL(url).hostname;
//     const newBookmark = await db.transaction(async (tx) => {
//       const newBookmarks = await tx
//         .insert(bookmarksTable)
//         .values({
//           id,
//           title,
//           description,
//           url,
//           favicon: faviconUrl,
//           createdAt,
//         })
//         .returning();
//       const tagTitlesArray = tags.split(",").map((tag) => {
//         return { title: tag.trim() };
//       });
//       const newTags = await tx
//         .insert(tagsTable)
//         .values(tagTitlesArray)
//         .onConflictDoNothing()
//         .returning();
//       const bookmarkTagsData = tags.split(",").map((tag) => {
//         return { bookmarkId: id, tagId: tag.trim() };
//       });
//       const newBookmarksTags = await tx
//         .insert(bookmarksTagsTable)
//         .values(bookmarkTagsData)
//         .returning();
//       return { newBookmarks, newTags, newBookmarksTags };
//     });
//     res.json(newBookmark);
//   } catch (error: unknown) {
//     if (error instanceof ZodError) {
//       console.log(error);
//       res.status(400).send({ error: error.issues });
//     } else {
//       console.log(error);
//       res.status(400).send({ error: "unknown error" });
//     }
//   }
// };

const createUser = async (req: Request, res: Response) => {
  const { email, password, fullName } = NewUserSchema.parse(req.body);
  console.log({ email, password, fullName });
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);
  await db.insert(usersTable).values({ email, passwordHash, fullName });
  res.end();
};

export default { createUser };
