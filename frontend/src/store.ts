// store.ts
import { create } from "zustand";
import type { Bookmark, Tag } from "./types";

interface useBookmarkDataStoreType {
  allBookmarkData: Bookmark[];
  actions: {
    setAllBookmarkData: (allBookMarks: Bookmark[]) => void;
    archiveBookmark: (bookmarkId: string) => void;
    unarchiveBookmark: (bookmarkId: string) => void;
    pinBookmark: (bookmarkId: string) => void;
    unpinBookmark: (bookmarkId: string) => void;
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
    unarchiveBookmark: (bookmarkId: string) => {
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
            bookmarksTable: {
              ...oldBookmark.bookmarksTable,
              isArchived: false,
            },
          };
          console.log({ oldBookmark, newBookmark, newBookmarkList });
          return { allBookmarkData: [...newBookmarkList, newBookmark] };
        } else {
          return { allBookmarkData: state.allBookmarkData };
        }
      });
    },
    pinBookmark: (bookmarkId: string) => {
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
            bookmarksTable: { ...oldBookmark.bookmarksTable, pinned: true },
          };
          console.log({ oldBookmark, newBookmark, newBookmarkList });
          return { allBookmarkData: [...newBookmarkList, newBookmark] };
        } else {
          return { allBookmarkData: state.allBookmarkData };
        }
      });
    },
    unpinBookmark: (bookmarkId: string) => {
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
            bookmarksTable: { ...oldBookmark.bookmarksTable, pinned: false },
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

const useAllBookmarkData = () =>
  useBookmarkDataStore((state) => state.allBookmarkData);
const useAllBookmarkDataControls = () =>
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

const useAllTagsData = () => useTagsDataStore((state) => state.allTagsData);
const useSeletedTags = () => useTagsDataStore((state) => state.selectedTags);
const useAllTagsControls = () => useTagsDataStore((state) => state.actions);

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

const useSidebarStatus = () =>
  useSidebarStatusStore((state) => state.sidebarStatus);
const useSidebarStatusControls = () =>
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

const useBookmarkFormStatus = () =>
  useBookmarkFormStore((state) => state.bookmarkFormStatus);
const useBookmarkFormStatusControls = () =>
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

const useSearchContent = () =>
  useSearchStateStore((state) => state.searchContent);
const useSearchStatusControls = () =>
  useSearchStateStore((state) => state.actions);

interface MainViewType {
  currrentView: boolean;
  actions: { setCurrentView: (value: boolean) => void };
}

const useMainViewStore = create<MainViewType>()((set) => ({
  currrentView: false,
  actions: {
    setCurrentView: (value) => set(() => ({ currrentView: value })),
  },
}));

const useCurrentView = () => useMainViewStore((state) => state.currrentView);
const useMainViewControls = () => useMainViewStore((state) => state.actions);

export {
  useCurrentView,
  useMainViewControls,
  useAllBookmarkData,
  useAllBookmarkDataControls,
  useAllTagsData,
  useSeletedTags,
  useAllTagsControls,
  useSidebarStatus,
  useSidebarStatusControls,
  useBookmarkFormStatus,
  useBookmarkFormStatusControls,
  useSearchContent,
  useSearchStatusControls,
};
