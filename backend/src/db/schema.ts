import {
  integer,
  pgTable,
  varchar,
  boolean,
  timestamp,
  primaryKey,
  uuid,
  text,
} from "drizzle-orm/pg-core";

export const bookmarksTable = pgTable("bookmarks", {
  id: varchar().primaryKey(),
  title: varchar({ length: 255 }).notNull().unique(),
  url: varchar({ length: 255 }).notNull().unique(),
  favicon: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  pinned: boolean().default(false),
  isArchived: boolean("is_archived").default(false),
  visitCount: integer("visit_count").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  lastVisited: timestamp("last_visited", { mode: "date" }),
  userId: uuid("user_Id")
    .notNull()
    .references(() => usersTable.id),
});

export const tagsTable = pgTable("tags", {
  title: varchar({ length: 255 }).notNull().primaryKey(),
});

export const bookmarksTagsTable = pgTable(
  "bookmarks_tags",
  {
    bookmarkId: varchar("bookmark_id")
      .notNull()
      .references(() => bookmarksTable.id, { onDelete: "cascade" }),
    tagId: varchar("tag_id")
      .notNull()
      .references(() => tagsTable.title),
    userId: uuid("user_Id")
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [primaryKey({ columns: [table.bookmarkId, table.tagId] })],
);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  fullName: varchar("full_name").notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const passwordResetTokenTable = pgTable(
  "password_reset_token",
  {
    userId: uuid("user_id"),
    token: varchar().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.token] })],
);
