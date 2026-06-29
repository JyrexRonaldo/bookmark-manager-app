import { useContext } from "react";
import BookmarkFormContext from "../../contexts/BookmarkFormContext/BookmarkFormContext";
import { useForm, type SubmitHandler, type FieldErrors } from "react-hook-form";
import BookmarkDataContext from "../../contexts/BookmarkDataContext/BookmarkDataContaxt";
import { type BookmarkData } from "../../types";

function AddBookmark() {
  const [showAddForm, setShowAddForm] = useContext(BookmarkFormContext);
  const allBookmarkData = useContext(BookmarkDataContext)[0];

  console.log(allBookmarkData);

  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm<BookmarkData>({
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
      setShowAddForm(!showAddForm);
    }
  }

  function handleDevButton(e) {
    console.log(e.target.textContent);
    switch (e.target.textContent) {
      case "Y":
        setValue("title", "youtube");
        setValue("description", "video hosting service");
        setValue("url", "https://www.youtube.com/");
        setValue("tags", "videos, doom scrolling, shows");
        break;
      case "O":
        setValue("title", "OVO");
        setValue("description", "Drakes site");
        setValue("url", "https://octobersveryown.com/");
        setValue("tags", "Drake, 6 God, champagne papi");
        break;
      case "F":
        setValue("title", "Fullstackopen");
        setValue("description", "learn web development make a ton of cash");
        setValue("url", "https://fullstackopen.com/");
        setValue("tags", "web, html, javascript");
        break;
      case "G":
        setValue("title", "Get cracked");
        setValue("description", "coding interview prep");
        setValue("url", "https://getcracked.io");
        setValue("tags", "learn, code, job");
        break;
      case "T":
        setValue("title", "The real world");
        setValue("description", "financial education");
        setValue("url", "https://www.university.com/");
        setValue("tags", "money, cash, more cash");
        break;
    }
  }


  async function uploadBookmark(bookmarkData: BookmarkData) {
    // console.log(bookmarkData);
    // const lastBookmarkIdNumber =
    //   +allBookmarkData[allBookmarkData.length - 1].bookmarksTable.id.slice(4);
    // const id = `bm-${String(lastBookmarkIdNumber + 1).padStart(3, "0")}`;
    // console.log({ id, ...bookmarkData });
    // console.log(lastBookmarkIdNumber, 'Oh nothing');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOME_DOMAIN}/bookmark`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookmarkData),
        },
      );

      // console.log(response)
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<BookmarkData> = (formData) => {
    const lastBookmarkIdNumber =
      +allBookmarkData[allBookmarkData.length - 1].bookmarksTable.id.slice(4);
    const id = `bm-${String(lastBookmarkIdNumber + 1).padStart(3, "0")}`;
    const favicon = new URL(formData.url).hostname;
    console.log({ favicon });
    const bookmarkData = { ...formData, id };
    console.log(bookmarkData);
    uploadBookmark(bookmarkData);
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
          className="m-[16px] flex w-[570px] flex-col gap-[32px] rounded-[16px] bg-white p-[32px]"
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
              onClick={handleDevButton}
              className="rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF]"
            >
              Y
            </button>
            <button
              onClick={handleDevButton}
              className="rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF]"
            >
              F
            </button>
            <button
              onClick={handleDevButton}
              className="rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF]"
            >
              O
            </button>
            <button
              onClick={handleDevButton}
              className="rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF]"
            >
              G
            </button>
            <button
              onClick={handleDevButton}
              className="rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF]"
            >
              T
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

export default AddBookmark;
