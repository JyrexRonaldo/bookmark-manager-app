// import parseNewDiaryEntry from "../utils.ts";
import {
  // express,
  type Request,
  type Response,
  //   type NextFunction,
} from "express";
// import diaryService from "../services/diaryService.ts";
// import {
//   NewEntrySchema,
//   type NonSensitiveDiaryEntry,
//   NewDiaryEntry,
//   DiaryEntry,
// } from "../types.ts";
// import { z } from "zod";

// const router = express.Router();

// import { z } from "zod"
import { NewBookmarkEntrySchema } from "../types.ts";
import db from "../../config/drizzle.ts";
import { bookmarksTable, bookmarksTagsTable, tagsTable } from "../db/schema.ts";
import { eq, sql } from "drizzle-orm";
import { ZodError } from "zod";

// const getTodosByUserId = async (req: Request, res: Response) => {
//   const { userId } = req.body;
//   const result = await db
//     .select()
//     .from(todosTable)
//     .where(eq(userId, todosTable.userId));
//   res.json(result);
// };

const getAllBookmarks = async (_req: Request, res: Response) => {
  const allBookmarks = await db
    .select({
      bookmarksTable,
      tags: sql<string[]>`json_agg(${tagsTable.title})`.as("tags"),
    })
    .from(bookmarksTagsTable)
    .innerJoin(
      bookmarksTable,
      eq(bookmarksTable.id, bookmarksTagsTable.bookmarkId),
    )
    .innerJoin(tagsTable, eq(tagsTable.title, bookmarksTagsTable.tagId))
    .groupBy(bookmarksTable.id)
    .orderBy(bookmarksTable.id);
  res.json(allBookmarks);
};

const addBookmark = async (req: Request, res: Response) => {
  try {
    const { id, title, description, url, tags } = NewBookmarkEntrySchema.parse(
      req.body,
    );
    // gets hostname from supplied url
    const faviconUrl = new URL(url).hostname;
    console.log({ id, title, description, url, tags });
    // allows multiple backend requests to be completed in one interaction
    const newBookmark = await db.transaction(async (tx) => {
      const newBookmarks = await tx
        .insert(bookmarksTable)
        .values({
          id,
          title,
          description,
          url,
          favicon: faviconUrl,
        })
        .returning();
      const tagTitlesArray = tags.split(",").map((tag) => {
        return { title: tag.trim() };
      });
      const newTags = await tx
        .insert(tagsTable)
        .values(tagTitlesArray)
        .onConflictDoNothing()
        .returning();
      const bookmarkTagsData = tags.split(",").map((tag) => {
        return { bookmarkId: id, tagId: tag.trim() };
      });
      const newBookmarksTags = await tx
        .insert(bookmarksTagsTable)
        .values(bookmarkTagsData)
        .returning();
      return { newBookmarks, newTags, newBookmarksTags };
    });
    console.log(newBookmark);
    res.end();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.log(error);
      res.status(400).send({ error: error.issues });
    } else {
      console.log(error);
      res.status(400).send({ error: "unknown error" });
    }
  }
};

export default { getAllBookmarks, addBookmark };
