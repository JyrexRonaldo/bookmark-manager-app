import { createContext } from "react";

interface AllBookmarksData {
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

const BookmarkDataContext = createContext<[AllBookmarksData[],React.Dispatch<React.SetStateAction<AllBookmarksData[]>> ]>(null);

export default BookmarkDataContext