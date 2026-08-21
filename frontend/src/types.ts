export interface Bookmark {
  bookmarksTable: {
    id: string;
    title: string;
    description: string;
    url: string;
    favicon: string;
    pinned: boolean | null;
    isArchived: boolean | null;
    visitCount: number | null;
    createdAt: Date | null;
    lastVisited: string | null;
  };
  tags: string;
}

export interface Tag {
  title: string;
}

type BookmarkTable = Bookmark["bookmarksTable"];

export interface BookmarkData extends BookmarkTable {
  tags: string;
}