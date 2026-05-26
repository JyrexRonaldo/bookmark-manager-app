import data from "../../frontend/data.ts";
import db from "./drizzle.ts";
import {
  bookmarksTable,
  tagsTable,
  bookmarksTagsTable,
} from "../src/db/schema.ts";

const bookmarkData = structuredClone(data);

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags?: string[] | null;
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  createdAt: string;
  lastVisited: string | null;
}

interface BookmarkTag {
  bookmarkId: string;
  tagId: string;
}

const bookmarksResult = bookmarkData.bookmarks.map((bookmark: Bookmark) => {
  delete bookmark.tags;
  return bookmark;
});

function populateTagArray() {
  let tags: string[] = [];
  for (const element of data.bookmarks) {
    tags = tags.concat(element.tags);
  }
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function populateDb() {
  await db.insert(bookmarksTable).values(bookmarksResult);
  await db.insert(tagsTable).values(populateTagArray());
  await db.insert(bookmarksTagsTable).values(populatebookmarkTagArray());
}
