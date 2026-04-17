import BookmarkCard from "../BookmarkCard/BookmarkCard";
import data from "../../../data";
import { format } from "date-fns";

const bookmarkElements = data.bookmarks.map((bookmark) => {
  const favicon = "/img" + bookmark.favicon.substring(15);

  const createdAt = format(bookmark.createdAt, "d LLL");
  const lastVisited = format(bookmark.lastVisited, "d LLL");

  return (
    <BookmarkCard
      key={bookmark.id}
      title={bookmark.title}
      url={bookmark.url}
      description={bookmark.description}
      tags={bookmark.tags}
      visitCount={bookmark.visitCount}
      createdAt={createdAt}
      lastVisited={lastVisited}
      favicon={favicon}
    />
  );
});

function Main() {
  return (
    <>
      <main className="col-start-2 col-end-6 row-start-2 row-end-3 flex h-full flex-col gap-[20px] bg-[#E8F0EF] px-[16px] pt-[24px] pb-[32px] sm:px-[32px]">
        <div className="flex h-[42px] items-center justify-between">
          <p className="font-manrope text-[24px]/[140%] font-bold text-[#051513]">
            All bookmarks
          </p>
          <button className="flex w-[107px] gap-[4px] rounded-[8px] border border-[#C0CFCC] bg-white px-[12px] py-[10px] text-[#051513]">
            <img src="/img/icon-sort.svg" alt="" />{" "}
            <p className="font-manrope text-[16px]/[140%]">Sort by</p>
          </button>
        </div>
        <div className="grid h-[200px] grow grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-[32px] overflow-y-scroll bg-[#E8F0EF]">
          {bookmarkElements}
        </div>
      </main>
    </>
  );
}

export default Main;
