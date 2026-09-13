export interface Bookmark {
  bookmarksTable: {
    id: string;
    title: string;
    description: string;
    url: string;
    favicon: string;
    pinned: boolean;
    isArchived: boolean;
    visitCount: number;
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

export interface FormValue {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string;
}

export type SortVariableType =
  | "mostVisited"
  | "recentlyAdded"
  | "recentlyVisited";

export type ThemeVariableType = "light" | "dark";

export interface NewUserType {
  fullName: string;
  email: string;
  password: string;
}

export interface UserType {
  email: string;
  password: string;
}
