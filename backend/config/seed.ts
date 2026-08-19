import data from "../../frontend/data.ts";
import db from "./drizzle.ts";
import {
  bookmarksTable,
  tagsTable,
  bookmarksTagsTable,
} from "../src/db/schema.ts";
import { z } from "zod";


const BookmarkSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  favicon: z.string(),
  description: z.string(),
  pinned: z.boolean(),
  isArchived: z.boolean(),
  visitCount: z.number(),
  createdAt: z.coerce.date(),
  lastVisited: z.coerce.date(),
});

const SampleBookmarkDataSchema = z.array(BookmarkSchema);

const bookmarkData = SampleBookmarkDataSchema.parse(data.bookmarks);

type Bookmark = z.infer<typeof BookmarkSchema>;

interface BookmarkTag {
  bookmarkId: string;
  tagId: string;
}

const bookmarksResult = bookmarkData.map((bookmark: Bookmark) => {
  bookmark.favicon = new URL(bookmark.url).hostname;
  return bookmark;
});

function populateTagArray() {
  let tags: string[] = [];
  for (const element of data.bookmarks) {
    tags = tags.concat(element.tags);
  }
  // new Set used here is for removing duplicates items from arrays
  const result = [...new Set(tags)];
  return result.map((item) => {
    return { title: item };
  });
}

function populatebookmarkTagArray() {
  const bookmarkTagArray: BookmarkTag[] = [];
  data.bookmarks.forEach((item) => {
    item.tags.forEach((tag) => {
      bookmarkTagArray.push({ bookmarkId: item.id, tagId: tag });
    });
  });
  return bookmarkTagArray;
}

export async function populateDb() {
  await db.transaction(async (tx) => {
    await tx.insert(bookmarksTable).values(bookmarksResult);
    await tx.insert(tagsTable).values(populateTagArray());
    await tx.insert(bookmarksTagsTable).values(populatebookmarkTagArray());
  });
}

await populateDb();
