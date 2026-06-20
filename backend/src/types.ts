import { z } from "zod";

export const NewBookmarkEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  // favicon: z.string(),
  description: z.string(),
  tags: z.string(),
  // pinned: z.boolean(),
  // isArchived: z.boolean(),
  // visitCount: z.number(),
  // createdAt: z.date(),
  // lastVisited: z.date(),
});

export type NewBookmarkEntry = z.infer<typeof NewBookmarkEntrySchema>;

