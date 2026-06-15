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
import { bookmarks, bookmarksTags, tags } from "../db/schema.ts";
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
      bookmarks,
      tags: sql<string[]>`json_agg(${tags.title})`.as("tags"),
    })
    .from(bookmarksTags)
    .innerJoin(bookmarks, eq(bookmarks.id, bookmarksTags.bookmarkId))
    .innerJoin(tags, eq(tags.title, bookmarksTags.tagId))
    .groupBy(bookmarks.id)
    .orderBy(bookmarks.id);
  res.json(allBookmarks);
};

const addBookmark = async (req: Request, res: Response) => {
  try {
    const { id, title, description, url, tagTitles } =
      NewBookmarkEntrySchema.parse(req.body);
    // gets hostname from supplied url
    const faviconUrl = new URL(url).hostname;
    // allows multiple backend requests to be completed in one interaction
    await db.transaction(async (tx) => {
      await tx.insert(bookmarks).values({
        id,
        title,
        description,
        url,
        favicon: faviconUrl,
      });
      const tagTitlesArray = tagTitles.split(",").map((tag) => {
        return { title: tag.trim() };
      });
      await tx.insert(tags).values(tagTitlesArray).onConflictDoNothing();
      const bookmarkTagsData = tagTitles.split(",").map((tag) => {
        return { bookmarkId: id, tagId: tag.trim() };
      });
      await tx.insert(bookmarksTags).values(bookmarkTagsData);
    });
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
