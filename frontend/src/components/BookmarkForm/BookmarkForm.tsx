import { useForm, type SubmitHandler, type FieldErrors } from "react-hook-form";
import type { Bookmark, BookmarkData } from "../../types";
import { faker } from "@faker-js/faker";
import { uploadBookmark, editBookmarkBackend } from "../../services";
import {
  useAllBookmarkData,
  useBookmarkFormStatusControls,
  useAllBookmarkDataControls,
  useAllTagsData,
  useAllTagsControls,
  useBookmarkFormView,
  useBookmarkFormValues,
} from "../../store";

function BookmarkForm() {
  const allBookmarkData = useAllBookmarkData();
  const formView = useBookmarkFormView();
  const currentFormValues = useBookmarkFormValues();
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
      toggleBookmarkForm(formView);
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

  const onSubmit: SubmitHandler<BookmarkData> = (formData) => {
    if (formView) {
      const lastBookmarkIdNumber =
        allBookmarkData.length !== 0
          ? +allBookmarkData[
              allBookmarkData.length - 1
            ].bookmarksTable.id.slice(4)
          : 0;
      const id = `bm-${String(lastBookmarkIdNumber + 1).padStart(3, "0")}`;
      const favicon = new URL(formData.url).hostname;
      const trimmedCapitalizedTags = formData.tags
        .replace(/\s/g, "")
        .split(",")
        .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
        .join();
      const bookmarkData = { ...formData, id, tags: trimmedCapitalizedTags };
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

      const currentTags = tags.split(",");
      const addedTags: string[] = [];

      allTagsData.forEach((tag) => {
        if (currentTags.includes(tag.title)) {
          tag.count += 1;
          addedTags.push(tag.title);
        }
      });

      const newTags = currentTags
        .filter((tag) => !addedTags.includes(tag))
        .map((newTag) => ({ title: newTag, count: 1 }));

      const newTagData = [...allTagsData, ...newTags];

      setAllBookmarkData([...allBookmarkData, newBookmark]);
      setAllTagsData(newTagData);
      uploadBookmark({ ...bookmarkData, createdAt: new Date() });
    } else {
      const targetEditBookmark = allBookmarkData.find(
        (bookmark) => bookmark.bookmarksTable.id === currentFormValues.id,
      );
      const { tags, ...bookmarksTableData } = formData;
      const favicon = new URL(formData.url).hostname;
      const editedBookmark = {
        bookmarksTable: {
          ...targetEditBookmark?.bookmarksTable,
          ...bookmarksTableData,
          favicon,
        },
        tags: tags,
      };
      const newBookmarkList = allBookmarkData.filter(
        (bookmark) =>
          bookmark.bookmarksTable.id !== editedBookmark.bookmarksTable.id,
      );

      const currentTags = tags.split(",");
      const addedTags: string[] = [];

      allTagsData.forEach((tag) => {
        if (currentTags.includes(tag.title)) {
          tag.count += 1;
          addedTags.push(tag.title);
        }
      });

      const newTags = currentTags
        .filter((tag) => !addedTags.includes(tag))
        .map((newTag) => ({ title: newTag, count: 1 }));

      const newTagData = [...allTagsData, ...newTags];

      setAllBookmarkData([...newBookmarkList, editedBookmark]);
      setAllTagsData(newTagData);
      editBookmarkBackend(currentFormValues.id , formData);
    }

    toggleBookmarkForm(formView);
  };

  const onError = (error: FieldErrors) => {
    console.log(error);
  };

  if (formView === false) {
    console.log(currentFormValues);
    setValue("title", `${currentFormValues.title}`);
    setValue("description", `${currentFormValues.description}`);
    setValue("url", `${currentFormValues.url}`);
    setValue("tags", currentFormValues.tags);
  }

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
              {formView ? (
                <p className="font-manrope text-[24px]/[140%] font-bold">
                  Add a bookmark
                </p>
              ) : (
                <p className="font-manrope text-[24px]/[140%] font-bold">
                  Edit bookmark
                </p>
              )}

              <img
                onClick={handleAddBookmarkFormDisplay}
                src="/img/icon-close.svg"
                alt=""
                className="size-[32px] rounded-[8px] border border-[#E8F0EF] p-[5px] hover:bg-[#E8F0EF]"
              />
            </div>
            {formView ? (
              <p className="font-manrope text-[14px]/[150%] font-medium tracking-[1%] text-[#4C5C59]">
                Save a link with details to keep your collection organized.
              </p>
            ) : (
              <p className="font-manrope text-[14px]/[150%] font-medium tracking-[1%] text-[#4C5C59]">
                Update your saved link details — change the title, description,
                URL, or tags anytime.
              </p>
            )}
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
            {formView ? (
              <button
                type="submit"
                className="rounded-[8px] bg-[#014745] text-white"
              >
                Add Bookmark
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-[8px] bg-[#014745] text-white"
              >
                Save Bookmark
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default BookmarkForm;
