import {
  integer,
  pgTable,
  varchar,
  boolean,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const bookmarksTable = pgTable("bookmarks", {
  id: varchar().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  favicon: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  pinned: boolean(),
  isArchived: boolean(),
  visitCount: integer().notNull(),
  createdAt: timestamp({ mode: "string" }).defaultNow(),
  lastVisited: timestamp({ mode: "string" }),
});

export const tagsTable = pgTable("tags", {
  title: varchar({ length: 255 }).notNull().primaryKey(),
});

export const bookmarksTagsTable = pgTable(
  "bookmarks_Tags",
  {
    bookmarkId: varchar("bookmark_id")
      .notNull()
      .references(() => bookmarksTable.id),
    tagId: varchar("tag_id")
      .notNull()
      .references(() => tagsTable.title),
  },
  (table) => [primaryKey({ columns: [table.bookmarkId, table.tagId] })],
);
