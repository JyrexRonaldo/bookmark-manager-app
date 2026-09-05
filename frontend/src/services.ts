import type { Bookmark, Tag, BookmarkData } from "./types";

const BACKEND_API_ENDPOINT = import.meta.env.VITE_HOME_DOMAIN;

async function getAllBookmarks() {
  const response = await fetch(`${BACKEND_API_ENDPOINT}/bookmark`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `${localStorage.getItem("userToken")}`,
    },
  });

  if (response.status === 401) {
    throw Error("User unauthenticated");
  }
  const data: { allBookmarks: Bookmark[]; allTags: Tag[] } =
    await response.json();
  return data;
}

async function uploadBookmark(bookmarkData: BookmarkData) {
  try {
    const response = await fetch(`${BACKEND_API_ENDPOINT}/bookmark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookmarkData),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function updateArchiveStatus(id: string, isArchived: boolean) {
  try {
    const response = await fetch(`${BACKEND_API_ENDPOINT}/bookmark/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isArchived }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function deletedBookmarkBackend(id: string) {
  try {
    const response = await fetch(`${BACKEND_API_ENDPOINT}/bookmark/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export {
  getAllBookmarks,
  uploadBookmark,
  updateArchiveStatus,
  deletedBookmarkBackend,
};
