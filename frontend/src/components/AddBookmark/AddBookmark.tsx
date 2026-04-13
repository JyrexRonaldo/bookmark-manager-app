function AddBookmark() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#131313]/70">
        <div className="flex h-[671px] w-[570px] flex-col gap-[32px] rounded-[16px] bg-white p-[32px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between">
              <p className="text-[24px]/[140%] font-bold">Add a bookmark</p>
              <img src="/img/icon-close.svg" alt="" />
            </div>
            <p className="text-[14px]/[150%] font-medium tracking-[1%] text-[#4C5C59]">
              Save a link with details to keep your collection organized. We
              extract the favicon automatically from the URL.
            </p>
          </div>
          <div className="flex flex-col gap-[32px] *:text-[14px]/[150%] **:rounded-[8px]">
            <div className="flex flex-col">
              <label htmlFor="">Title *</label>
              <input type="text" className="h-[45px] border" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Description *</label>
              <textarea name="" id="" className="h-[91px] border"></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Website URL *</label>
              <input type="text" className="h-[45px] border" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Tags *</label>
              <input type="text" className="h-[45px] border" />
            </div>
          </div>
          <div className="flex justify-end gap-[16px] *:px-[16px] *:py-[12px]">
            <button className="rounded-[8px] border border-[#C0CFCC]">
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
