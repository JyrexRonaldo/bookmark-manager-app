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
    createdAt: Date | null;
    lastVisited: string | null;
  };
  tags: string[];
}

type BookmarkTableData = AllBookmarksData["bookmarksTable"] 

export interface BookmarkData extends BookmarkTableData {
  tags: string[];
}