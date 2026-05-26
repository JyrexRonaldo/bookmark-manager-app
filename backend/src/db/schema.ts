import {
  integer,
  pgTable,
  varchar,
  boolean,
//   text,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

// export const usersTable = pgTable("users", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
//   age: integer().notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
// });

export const bookmarksTable = pgTable("bookmarks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  favicon: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  pinned: boolean(),
  isArchived: boolean(),
  visitCount: integer().notNull(),
  createdAt: timestamp().defaultNow(),
  lastVisited: timestamp(),
});

export const tagsTable = pgTable("tags", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
});

export const bookmarksTagsTable = pgTable(
  "bookmarks_Tags",
  {
    bookmarkId: integer("bookmark_id"),
    tagId: integer("tag_id"),
  },
  (table) => [primaryKey({ columns: [table.bookmarkId, table.tagId] })],
);

// export const booksToAuthors = pgTable("books_to_authors", {
//   authorId: integer("author_id"),
//   bookId: integer("book_id"),
// }, (table) => [
//   primaryKey({ columns: [table.bookId, table.authorId] }),
//   // Or PK with custom name
//   primaryKey({ name: 'custom_name', columns: [table.bookId, table.authorId] }),
// ]);
