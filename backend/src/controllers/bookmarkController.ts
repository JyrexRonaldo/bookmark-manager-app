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
  //   const data = NewBookmarkEntrySchema.parse(req.body);
  //   const data = NewBookmarkEntrySchema.parse(req.body);
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
  // console.log(allBookmarks);
  res.json(allBookmarks);
};

const addBookmark = async (req: Request, res: Response) => {
  //   const data = NewBookmarkEntrySchema.parse(req.body);
  //   const data = NewBookmarkEntrySchema.parse(req.body);

  try {
    const { id, title, description, url, tags } = NewBookmarkEntrySchema.parse(
      req.body,
    );
    const faviconUrl = new URL(url).hostname;
    console.log({ id, title, description, url, tags, faviconUrl });
    await db
      .insert(bookmarks)
      .values({ id, title, description, url, favicon: faviconUrl });
    res.end();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.log(error);
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }

  // const { title, description, url, tags } = NewBookmarkEntrySchema.parse(
  //   req.body,
  // );
  // console.log({ title, description, url, tags });
  // const allBookmarks = await db
  //   .select({
  //     bookmarks,
  //     tags: sql<string[]>`json_agg(${tags.title})`.as("tags"),
  //   })
  //   .from(bookmarksTags)
  //   .innerJoin(bookmarks, eq(bookmarks.id, bookmarksTags.bookmarkId))
  //   .innerJoin(tags, eq(tags.title, bookmarksTags.tagId))
  //   .groupBy(bookmarks.id)
  //   .orderBy(bookmarks.id);
  // // console.log(allBookmarks);
  // res.json(allBookmarks);
  // res.end();
};

export default { getAllBookmarks, addBookmark };
