// store.ts
import { create } from "zustand";
import type { Bookmark } from "./types";

interface useBookmarkDataStoreType {
  allBookmarkData: Bookmark[];
  actions: { setAllBookmarkData: (allBookMarks: Bookmark[]) => void };
}

// Create store using the curried form of `create`
const useBookmarkDataStore = create<useBookmarkDataStoreType>()((set) => ({
  allBookmarkData: [],
  actions: {
    setAllBookmarkData: (allBookMarks: Bookmark[]) =>
      set(() => ({ allBookmarkData: allBookMarks })),
  },
}));

export const useAllBookmarkData = () =>
  useBookmarkDataStore((state) => state.allBookmarkData);
export const useAllBookmarkDataControls = () =>
  useBookmarkDataStore((state) => state.actions);

interface useTagsDataStoreType {
  allTagsData: string[];
  actions: { setAllTagsData: (allTags: string[]) => void };
}

const useTagsDataStore = create<useTagsDataStoreType>()((set) => ({
  allTagsData: [],
  actions: {
    setAllTagsData: (allTags: string[]) =>
      set(() => ({ allTagsData: allTags })),
  },
}));

export const useAllTagsData = () =>
  useTagsDataStore((state) => state.allTagsData);
export const useAllTagsControls = () =>
  useTagsDataStore((state) => state.actions);

interface useSidebarStatusStoreType {
  sideBarStatus: boolean;
  actions: { toggleSidebar: () => void };
}

// Create store using the curried form of `create`
const useSidebarStatusStore = create<useSidebarStatusStoreType>()((set) => ({
  sideBarStatus: false,
  actions: {
    toggleSidebar: () =>
      set((state) => ({ sideBarStatus: !state.sideBarStatus })),
  },
}));

export const useSideBarStatus = () =>
  useSidebarStatusStore((state) => state.sideBarStatus);
export const useSideBarStatusControls = () =>
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
