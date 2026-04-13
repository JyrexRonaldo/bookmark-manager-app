import BookmarkCard from "../BookmarkCard/BookmarkCard";

function Main() {
  return (
    <>
      <main className="flex h-full flex-col gap-[20px] bg-[#E8F0EF] px-[16px] pt-[24px] pb-[32px] sm:px-[32px]">
        <div className="flex h-[42px] items-center justify-between">
          <p className="text-[20px]/[120%] font-bold text-[#051513]">
            All bookmarks
          </p>
          <button className="flex w-[107px] gap-[4px] rounded-[8px] border border-[#C0CFCC] bg-white px-[12px] py-[10px] text-[#051513]">
            <img src="/img/icon-sort.svg" alt="" /> <p>Sort by</p>
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(338px,_1fr))] gap-[32px]  bg-[#E8F0EF] overflow-y-scroll">
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
        </div>
      </main>
    </>
  );
}

export default Main;
