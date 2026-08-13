export interface BookmarkData {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  favicon: string;
  pinned: boolean | null;
  isArchived: boolean | null;
  visitCount: number | null;
  createdAt: string | null;
  lastVisited: string | null;
}

export interface AllBookmarksData {
  bookmarksTable: {
    id: string;
    title: string;
    description: string;
    url: string;
    favicon: string;
    pinned: boolean | null;
    isArchived: boolean | null;
    visitCount: number | null;
    createdAt: string | null;
    lastVisited: string | null;
  };
  tags: string[];
}
