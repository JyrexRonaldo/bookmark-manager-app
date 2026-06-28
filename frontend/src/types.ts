export interface BookmarkData {
  title: string;
  description: string;
  url: string;
  tags: string;
}

export interface AllBookmarksData {
    bookmarksTable: {
        id: string;
        title: string;
        url: string;
        favicon: string;
        description: string;
        pinned: boolean | null;
        isArchived: boolean | null;
        visitCount: number | null;
        createdAt: string | null;
        lastVisited: string | null;
    };
    tags: string[];
};