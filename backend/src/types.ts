import { z } from "zod";

export const NewBookmarkEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  // favicon: z.string(),
  description: z.string(),
  tags: z.string().transform((val) =>
    val
      .replace(/\s/g, "")
      .split(",")
      .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
      .join(),
  ),
  // pinned: z.boolean(),
  // isArchived: z.boolean(),
  // visitCount: z.number(),
  createdAt: z.coerce.date(),
  // lastVisited: z.date(),
});

export const EditBookmarkSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  isArchived: z.coerce.boolean().optional(),
  url: z.string().optional(),
  description: z.string().optional(),
  lastVisited: z.coerce.date().optional(),
  tags: z
    .string()
    .transform((val) =>
      val
        .replace(/\s/g, "")
        .split(",")
        .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
        .join(),
    )
    .optional(),
});

export const NewUserSchema = z.object({
  email: z.email(),
  password: z.string(),
  fullName: z.string(),
});

export type NewBookmarkEntry = z.infer<typeof NewBookmarkEntrySchema>;
