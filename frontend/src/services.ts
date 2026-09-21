import type {
  Bookmark,
  Tag,
  BookmarkData,
  FormValue,
  NewUserType,
  UserType,
} from "./types";

const BACKEND_API_ENDPOINT = import.meta.env.VITE_HOME_DOMAIN;

async function getAllBookmarks() {
  const response = await fetch(`${BACKEND_API_ENDPOINT}/bookmark`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("userToken")}`,
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("userToken")}`,
      },
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("userToken")}`,
      },
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("userToken")}`,
      },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function editBookmarkBackend(bookmarkId: string, formValue: FormValue) {
  try {
    const response = await fetch(
      `${BACKEND_API_ENDPOINT}/bookmark/${bookmarkId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(formValue),
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function updateLastVisitDateBackend(bookmarkId: string) {
  try {
    const response = await fetch(
      `${BACKEND_API_ENDPOINT}/bookmark/${bookmarkId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ lastVisited: new Date().toISOString() }),
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function createUser(userData: NewUserType) {
  try {
    const response = await fetch(`${BACKEND_API_ENDPOINT}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function signIn(userData: UserType) {
  try {
    const response = await fetch(`${BACKEND_API_ENDPOINT}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (response.status === 404) {
      throw new Error("User not found");
    }

    if (!response.ok) {
        const data = await response.json();
        // console.log(data.message);
        throw new Error(data.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

async function resetPassword(email: string) {
  try {
    const response = await fetch(`${BACKEND_API_ENDPOINT}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function updatePassword(password: string, token: string) {
  try {
    const response = await fetch(
      `${BACKEND_API_ENDPOINT}/reset-password/${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      },
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export {
  getAllBookmarks,
  uploadBookmark,
  updateArchiveStatus,
  deletedBookmarkBackend,
  editBookmarkBackend,
  updateLastVisitDateBackend,
  createUser,
  signIn,
  resetPassword,
  updatePassword,
};
