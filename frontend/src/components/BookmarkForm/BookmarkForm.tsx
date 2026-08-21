import { useForm, type SubmitHandler, type FieldErrors } from "react-hook-form";
import type { Bookmark, BookmarkData } from "../../types";
import { faker } from "@faker-js/faker";
import {
  useAllBookmarkData,
  useBookmarkFormStatusControls,
  useAllBookmarkDataControls,
  useAllTagsData,
  useAllTagsControls,
} from "../../store";

function BookmarkForm() {
  const allBookmarkData = useAllBookmarkData();

  const { toggleBookmarkForm } = useBookmarkFormStatusControls();
  const { setAllBookmarkData } = useAllBookmarkDataControls();
  const allTagsData = useAllTagsData();
  const { setAllTagsData } = useAllTagsControls();

  const { register, handleSubmit, setValue } = useForm<BookmarkData>({
    defaultValues: {
      title: "",
      description: "",
      url: "",
      tags: "",
    },
  });

  function handleAddBookmarkFormDisplay(
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (e.target === e.currentTarget) {
      toggleBookmarkForm();
    }
  }

  function handleDevButton() {
    const title = faker.internet.domainWord();
    const description = faker.lorem.lines(3);
    const url = `https://www.${title}.com/`;
    const tags = faker.word.words(4).split(" ").join(", ");

    setValue("title", `${title}`);
    setValue("description", `${description}`);
    setValue("url", `${url}`);
    setValue("tags", tags);
  }

  async function uploadBookmark(bookmarkData: BookmarkData) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOME_DOMAIN}/bookmark`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookmarkData),
        },
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<BookmarkData> = (formData) => {
    const lastBookmarkIdNumber =
      allBookmarkData.length !== 0
        ? +allBookmarkData[allBookmarkData.length - 1].bookmarksTable.id.slice(
            4,
          )
        : 0;
    const id = `bm-${String(lastBookmarkIdNumber + 1).padStart(3, "0")}`;
    const favicon = new URL(formData.url).hostname;
    const trimmedCapitalizedTags = formData.tags
      .replace(/\s/g, "")
      .split(",")
      .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase())
      .join();
    const bookmarkData = { ...formData, id, tags: trimmedCapitalizedTags };
    console.log(bookmarkData);

    const { tags, ...data } = bookmarkData;

    const newBookmark: Bookmark = {
      bookmarksTable: {
        ...data,
        favicon,
        pinned: false,
        isArchived: false,
        visitCount: 0,
        createdAt: new Date(),
        lastVisited: null,
      },
      tags: tags,
    };

    setAllBookmarkData([...allBookmarkData, newBookmark]);
    setAllTagsData([...allTagsData, ...tags.split(",")].sort());
    uploadBookmark({ ...bookmarkData, createdAt: new Date() });
  };

  const onError = (error: FieldErrors) => {
    console.log(error);
  };

  return (
    <>
      <div
        onClick={handleAddBookmarkFormDisplay}
        className="fixed z-2 flex h-screen w-full items-center justify-center bg-[#131313]/70"
      >
        <form
          className="m-4 flex w-142.5 flex-col gap-8 rounded-2xl bg-white p-[32px]"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between">
              <p className="font-manrope text-[24px]/[140%] font-bold">
                Add a bookmark
              </p>
              <img
                onClick={handleAddBookmarkFormDisplay}
                src="/img/icon-close.svg"
                alt=""
                className="size-[32px] rounded-[8px] border border-[#E8F0EF] p-[5px] hover:bg-[#E8F0EF]"
              />
            </div>
            <p className="font-manrope text-[14px]/[150%] font-medium tracking-[1%] text-[#4C5C59]">
              Save a link with details to keep your collection organized. We
              extract the favicon automatically from the URL.
            </p>
          </div>
          <div className="flex flex-col gap-[32px] *:text-[14px]/[150%] **:rounded-[8px]">
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Title *
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "title field can't be emptty",
                })}
                className="h-[45px] border p-[12px] hover:bg-[#E8F0EF]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "description field can't be emptty",
                })}
                className="h-[91px] border p-[12px] hover:bg-[#E8F0EF]"
              ></textarea>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Website URL *
              </label>
              <input
                type="text"
                {...register("url", {
                  required: "url field can't be emptty",
                })}
                className="h-[45px] border p-[12px] hover:bg-[#E8F0EF]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Tags *
              </label>
              <input
                type="text"
                {...register("tags", {
                  required: "tags field can't be emptty",
                })}
                className="h-[45px] border p-[12px] hover:bg-[#E8F0EF]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-[16px] *:px-[16px] *:py-[12px]">
            {/* temporal text buttons */}
            <button
              type="button"
              onClick={handleDevButton}
              className="rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF]"
            >
              Sample data
            </button>
            {/* temporal text buttons */}
            <button
              onClick={handleAddBookmarkFormDisplay}
              className="rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-[8px] bg-[#014745] text-white"
            >
              Add Bookmark
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BookmarkForm;
