import {
  integer,
  pgTable,
  varchar,
  boolean,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const bookmarks = pgTable("bookmarks", {
  id: varchar().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  favicon: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  pinned: boolean().default(false),
  isArchived: boolean().default(false),
  visitCount: integer(),
  createdAt: timestamp({ mode: "string" }).defaultNow(),
  lastVisited: timestamp({ mode: "string" }),
});

export const tags = pgTable("tags", {
  title: varchar({ length: 255 }).notNull().primaryKey(),
});

export const bookmarksTags = pgTable(
  "bookmarks_Tags",
  {
    bookmarkId: varchar("bookmark_id")
      .notNull()
      .references(() => bookmarks.id),
    tagId: varchar("tag_id")
      .notNull()
      .references(() => tags.title),
  },
  (table) => [primaryKey({ columns: [table.bookmarkId, table.tagId] })],
);

