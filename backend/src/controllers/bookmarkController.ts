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
      tags: sql<string>`json_agg(${tagsTable.title})`.as("tags"),
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
    // console.log({ id, title, description, url, tags });
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
      const tagTitlesArray = tags[0].split(",").map((tag) => {
        return { title: tag.trim() };
      });
      const newTags = await tx
        .insert(tagsTable)
        .values(tagTitlesArray)
        .onConflictDoNothing()
        .returning();
      const bookmarkTagsData = tags[0].split(",").map((tag) => {
        return { bookmarkId: id, tagId: tag.trim() };
      });
      const newBookmarksTags = await tx
        .insert(bookmarksTagsTable)
        .values(bookmarkTagsData)
        .returning();
      return { newBookmarks, newTags, newBookmarksTags };
    });

    const uploadedTags = newBookmark.newBookmarksTags.map((item) => item.tagId);
    // newBookmark.newBookmarksTags = newBookmark.newBookmarksTags.map((item) => item.tagId);
    //  = newBookmark.newBookmarksTags.map((item) => item.tagId);
    // console.log(newBookmark.newBookmarksTags.map((item) => item.tagId));
    res.json({ ...newBookmark, uploadedTags });
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

// 0]
// [1] My Express app - listening on port 3000!
// [1] {
// [1]   id: 'bm-028',
// [1]   title: 'odin project',
// [1]   description: 'learning, site , database',
// [1]   url: 'https://www.theodinproject.com/',
// [1]   tags: 'site, mdn, documentation'
// [1] }
// [1] {
// [1]   newBookmarks: [
// [1]     {
// [1]       id: 'bm-028',
// [1]       title: 'odin project',
// [1]       url: 'https://www.theodinproject.com/',
// [1]       favicon: 'www.theodinproject.com',
// [1]       description: 'learning, site , database',
// [1]       pinned: false,
// [1]       isArchived: false,
// [1]       visitCount: 0,
// [1]       createdAt: '2026-06-21 16:50:00.660136',
// [1]       lastVisited: null
// [1]     }
// [1]   ],
// [1]   newTags: [ { title: 'mdn' }, { title: 'documentation' } ],
// [1]   newBookmarksTags: [
// [1]     { bookmarkId: 'bm-028', tagId: 'site' },
// [1]     { bookmarkId: 'bm-028', tagId: 'mdn' },
// [1]     { bookmarkId: 'bm-028', tagId: 'documentation' }
// [1]   ]
// [1] }
// [1] [
// [1]   { bookmarkId: 'bm-028', tagId: 'site' },
// [1]   { bookmarkId: 'bm-028', tagId: 'mdn' },
// [1]   { bookmarkId: 'bm-028', tagId: 'documentation' }
// [1] ]
