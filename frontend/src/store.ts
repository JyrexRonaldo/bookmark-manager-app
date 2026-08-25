// store.ts
import { create } from "zustand";
import type { Bookmark, Tag } from "./types";

interface useBookmarkDataStoreType {
  allBookmarkData: Bookmark[];
  actions: {
    setAllBookmarkData: (allBookMarks: Bookmark[]) => void;
    archiveBookmark: (bookmarkId: string) => void;
  };
}

// Create store using the curried form of `create`
const useBookmarkDataStore = create<useBookmarkDataStoreType>()((set) => ({
  allBookmarkData: [],
  actions: {
    setAllBookmarkData: (allBookMarks: Bookmark[]) =>
      set(() => ({ allBookmarkData: allBookMarks })),
    archiveBookmark: (bookmarkId: string) => {
      return set((state) => {
        const oldBookmark = state.allBookmarkData.find(
          (bookmark) => bookmark.bookmarksTable.id === bookmarkId,
        );
        const newBookmarkList = state.allBookmarkData.filter(
          (bookmark) => bookmark.bookmarksTable.id !== bookmarkId,
        );

        if (oldBookmark) {
          const newBookmark = {
            ...oldBookmark,
            bookmarksTable: { ...oldBookmark.bookmarksTable, isArchived: true },
          };
          console.log({ oldBookmark, newBookmark, newBookmarkList });
          return { allBookmarkData: [...newBookmarkList, newBookmark] };
        } else {
          return { allBookmarkData: state.allBookmarkData };
        }
      });
    },
  },
}));

export const useAllBookmarkData = () =>
  useBookmarkDataStore((state) => state.allBookmarkData);
export const useAllBookmarkDataControls = () =>
  useBookmarkDataStore((state) => state.actions);

interface useTagsDataStoreType {
  allTagsData: Tag[];
  selectedTags: string[];
  actions: {
    setAllTagsData: (allTags: Tag[]) => void;
    toggleSelectedTags: (toggledTag: string) => void;
    clearSelectedTags: () => void;
  };
}

const useTagsDataStore = create<useTagsDataStoreType>()((set) => ({
  allTagsData: [],
  selectedTags: [],
  actions: {
    setAllTagsData: (allTags: Tag[]) => {
      const sortedTags = allTags.toSorted((tagA, tagB) =>
        tagA.title > tagB.title ? 1 : -1,
      );
      return set(() => ({ allTagsData: sortedTags }));
    },
    toggleSelectedTags: (toggledTag: string) => {
      return set((state) => {
        if (state.selectedTags.includes(toggledTag)) {
          const filteredTag = state.selectedTags.filter(
            (currentTag) => toggledTag !== currentTag,
          );
          return { selectedTags: filteredTag };
        } else {
          return { selectedTags: [...state.selectedTags, toggledTag] };
        }
      });
    },
    clearSelectedTags: () => set(() => ({ selectedTags: [] })),
  },
}));

export const useAllTagsData = () =>
  useTagsDataStore((state) => state.allTagsData);
export const useSeletedTags = () =>
  useTagsDataStore((state) => state.selectedTags);
export const useAllTagsControls = () =>
  useTagsDataStore((state) => state.actions);

interface useSidebarStatusStoreType {
  sidebarStatus: boolean;
  actions: { toggleSidebar: () => void };
}

// Create store using the curried form of `create`
const useSidebarStatusStore = create<useSidebarStatusStoreType>()((set) => ({
  sidebarStatus: false,
  actions: {
    toggleSidebar: () =>
      set((state) => ({ sidebarStatus: !state.sidebarStatus })),
  },
}));

export const useSidebarStatus = () =>
  useSidebarStatusStore((state) => state.sidebarStatus);
export const useSidebarStatusControls = () =>
  useSidebarStatusStore((state) => state.actions);

interface useBookmarkFormStoreType {
  bookmarkFormStatus: boolean;
  actions: { toggleBookmarkForm: () => void };
}

// Create store using the curried form of `create`
const useBookmarkFormStore = create<useBookmarkFormStoreType>()((set) => ({
  bookmarkFormStatus: false,
  actions: {
    toggleBookmarkForm: () =>
      set((state) => ({ bookmarkFormStatus: !state.bookmarkFormStatus })),
  },
}));

export const useBookmarkFormStatus = () =>
  useBookmarkFormStore((state) => state.bookmarkFormStatus);
export const useBookmarkFormStatusControls = () =>
  useBookmarkFormStore((state) => state.actions);

interface useSearchStateStoreType {
  searchContent: string;
  actions: {
    populateSearchContent: (value: string) => void;
  };
}

// Create store using the curried form of `create`
const useSearchStateStore = create<useSearchStateStoreType>()((set) => ({
  searchContent: "",
  actions: {
    populateSearchContent: (value) => set(() => ({ searchContent: value })),
  },
}));

export const useSearchContent = () =>
  useSearchStateStore((state) => state.searchContent);
export const useSearchStatusControls = () =>
  useSearchStateStore((state) => state.actions);

interface MainViewType {
  currrentView: boolean;
  actions: { setCurrentView: (value: boolean) => void };
}

const useMainViewStore = create<MainViewType>()((set) => ({
  currrentView: true,
  actions: {
    setCurrentView: (value) => set(() => ({ currrentView: value })),
  },
}));

export const useCurrentView = () =>
  useMainViewStore((state) => state.currrentView);
export const useMainViewControls = () =>
  useMainViewStore((state) => state.actions);
