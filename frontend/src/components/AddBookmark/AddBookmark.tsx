import { useContext } from "react";
import AddBookmarkContext from "../../contexts/AddBookmarkContext/AddBookmarkContext";

function AddBookmark() {
  const { showAddForm, setShowAddForm } = useContext(AddBookmarkContext);

  function handleAddBookmark(
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (e.target === e.currentTarget) {
      setShowAddForm(!showAddForm);
    }
  }

  return (
    <>
      <div
        onClick={handleAddBookmark}
        className="fixed z-2 flex h-screen w-full items-center justify-center bg-[#131313]/70"
      >
        <div className="m-[16px] flex w-[570px] flex-col gap-[32px] rounded-[16px] bg-white p-[32px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between">
              <p className="font-manrope text-[24px]/[140%] font-bold">
                Add a bookmark
              </p>
              <img
                onClick={handleAddBookmark}
                src="/img/icon-close.svg"
                alt=""
                className="size-[32px] rounded-[8px] border p-[5px] border-[#E8F0EF] hover:bg-[#E8F0EF]"
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
                className="h-[45px] border p-[12px] hover:bg-[#E8F0EF]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Description *
              </label>
              <textarea
                name=""
                id=""
                className="h-[91px] border p-[12px] hover:bg-[#E8F0EF]"
              ></textarea>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Website URL *
              </label>
              <input
                type="text"
                className="h-[45px] border p-[12px] hover:bg-[#E8F0EF]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="" className="font-manrope text-[14px]/[140%]">
                Tags *
              </label>
              <input
                type="text"
                className="h-[45px] border p-[12px] hover:bg-[#E8F0EF]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-[16px] *:px-[16px] *:py-[12px]">
            <button
              onClick={handleAddBookmark}
              className="rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF]"
            >
              Cancel
            </button>
            <button className="rounded-[8px] bg-[#014745] text-white">
              Add Bookmark
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBookmark;
