import { type Request, type Response } from "express";
import { EditBookmarkSchema, NewBookmarkEntrySchema } from "../types.ts";
import db from "../../config/drizzle.ts";
import { bookmarksTable, bookmarksTagsTable, tagsTable } from "../db/schema.ts";
import { eq, notInArray, sql } from "drizzle-orm";
import { ZodError } from "zod";

const getAllBookmarks = async (_req: Request, res: Response) => {
  const allData = await db.transaction(async (tx) => {
    const allTags = await tx
      .select({
        title: bookmarksTagsTable.tagId,
        count: sql<number>`cast(count(${bookmarksTagsTable.tagId}) as int)`,
      })
      .from(bookmarksTagsTable)
      .groupBy(bookmarksTagsTable.tagId);

    const allBookmarks = await tx
      .select({
        bookmarksTable,
        tags: sql<string>`string_agg(${tagsTable.title}, ',')`.as("tags"),
      })
      .from(bookmarksTagsTable)
      .innerJoin(
        bookmarksTable,
        eq(bookmarksTable.id, bookmarksTagsTable.bookmarkId),
      )
      .innerJoin(tagsTable, eq(tagsTable.title, bookmarksTagsTable.tagId))
      .groupBy(bookmarksTable.id)
      .orderBy(bookmarksTable.id);

    return { allBookmarks, allTags };
  });
  res.json(allData);
};

const addBookmark = async (req: Request, res: Response) => {
  try {
    const { id, title, description, url, tags, createdAt } =
      NewBookmarkEntrySchema.parse(req.body);
    const faviconUrl = new URL(url).hostname;
    const newBookmark = await db.transaction(async (tx) => {
      const newBookmarks = await tx
        .insert(bookmarksTable)
        .values({
          id,
          title,
          description,
          url,
          favicon: faviconUrl,
          createdAt,
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
    res.json(newBookmark);
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
const editBookmark = async (req: Request, res: Response) => {
  const { id } = EditBookmarkSchema.parse(req.params);
  const { isArchived, title, description, url, tags } =
    EditBookmarkSchema.parse(req.body);
  if (isArchived !== undefined && id !== undefined) {
    await db
      .update(bookmarksTable)
      .set({ isArchived: isArchived })
      .where(eq(bookmarksTable.id, id));
  }

  if (
    id !== undefined &&
    title !== undefined &&
    description !== undefined &&
    url !== undefined &&
    tags !== undefined
  ) {
    const faviconUrl = new URL(url).hostname;
    await db.transaction(async (tx) => {
      await tx
        .update(bookmarksTable)
        .set({ title, description, url, favicon: faviconUrl })
        .where(eq(bookmarksTable.id, id));
      const tagTitlesArray = tags.split(",").map((tag) => {
        return { title: tag.trim() };
      });

      console.log(tagTitlesArray);

      await tx.insert(tagsTable).values(tagTitlesArray).onConflictDoNothing();
      await tx.delete(bookmarksTagsTable).where(eq(bookmarksTagsTable.bookmarkId, id));
      const bookmarkTagsData = tags.split(",").map((tag) => {
        return { bookmarkId: id, tagId: tag.trim() };
      });
      await tx.insert(bookmarksTagsTable).values(bookmarkTagsData).onConflictDoNothing();
    });
  }
  res.end();
};

const deleteBookmark = async (req: Request, res: Response) => {
  const { id } = EditBookmarkSchema.parse(req.params);
  if (id !== undefined) {
    await db.transaction(async (tx) => {
      await tx
        .delete(bookmarksTable)
        .where(eq(bookmarksTable.id, id))
        .returning();
      await tx
        .delete(tagsTable)
        .where(
          notInArray(
            tagsTable.title,
            tx
              .select({ id: bookmarksTagsTable.tagId })
              .from(bookmarksTagsTable),
          ),
        );
    });
  }
  res.end();
};

export default { getAllBookmarks, addBookmark, editBookmark, deleteBookmark };