export interface Bookmark {
  bookmarksTable: {
    id: string;
    title: string;
    description: string;
    url: string;
    favicon: string;
    pinned: boolean | null;
    isArchived: boolean;
    visitCount: number | null;
    createdAt: Date | string;
    lastVisited: string | null;
  };
  tags: string;
}

export interface Tag {
  title: string;
  count: number;
}

type BookmarkTable = Bookmark["bookmarksTable"];

export interface BookmarkData extends BookmarkTable {
  tags: string;
}
