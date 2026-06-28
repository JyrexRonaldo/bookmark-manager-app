import Popup from "reactjs-popup";
import { RemoveScroll } from "react-remove-scroll";
import BookmarkCard from "../BookmarkCard/BookmarkCard";
import { format } from "date-fns";
import SortByDropdown from "../SortByDropdown/SortByDropdown";
import { useEffect, useContext } from "react";
import BookmarkDataContext from "../../contexts/BookmarkDataContext/BookmarkDataContaxt";

function Main() {
  const [allBookmarkData, setAllBookmarkData] = useContext(BookmarkDataContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOME_DOMAIN}/bookmark`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `${localStorage.getItem("userToken")}`,
            },
          },
        );

        // if (response.status === 401) {
        //   navigate("/login");
        // }
        const data = await response.json();
        console.log(data)
        setAllBookmarkData(data);
      } catch (error) {
        console.log(error);
        // setError(true);
      } finally {
        // setLoading(false);
      }
    }
    fetchData();
  }, []);

  const bookmarkElements = allBookmarkData.map((bookmark) => {
    const currentBookmark = bookmark.bookmarksTable;
    const currentTag = bookmark.tags;
    // console.log(currentBookmark);
    const favicon = `https://www.google.com/s2/favicons?domain=${currentBookmark.favicon}&sz=${64}`;

    const createdAt = format(currentBookmark.createdAt, "d LLL");
    console.log()
    const lastVisited = currentBookmark.lastVisited ?  format(currentBookmark.lastVisited, "d LLL") : null;

    return (
      <BookmarkCard
        key={currentBookmark.id}
        title={currentBookmark.title}
        url={currentBookmark.url}
        description={currentBookmark.description}
        tags={currentTag}
        visitCount={currentBookmark.visitCount}
        createdAt={createdAt}
        lastVisited={lastVisited}
        favicon={favicon}
      />
    );
  });

  const sortByPopup = (
    <button className="flex w-[107px] gap-[4px] rounded-[8px] border border-[#C0CFCC] bg-white px-[12px] py-[10px] text-[#051513] hover:bg-[#E8F0EF]">
      <img src="/img/icon-sort.svg" alt="" />{" "}
      <p className="font-manrope text-[16px]/[140%]">Sort by</p>
    </button>
  );

  return (
    <>
      <main className="col-start-2 col-end-6 row-start-2 row-end-3 flex h-full flex-col gap-[20px] bg-[#E8F0EF] px-[16px] pt-[24px] pb-[32px] sm:px-[32px]">
        <div className="flex h-[42px] items-center justify-between">
          <p className="font-manrope text-[24px]/[140%] font-bold text-[#051513]">
            All bookmarks
          </p>

          <Popup
            trigger={sortByPopup}
            position={"bottom right"}
            offsetY={4}
            offsetX={14}
            arrow={false}
            closeOnDocumentClick
          >
            <RemoveScroll>
              <SortByDropdown />
            </RemoveScroll>
          </Popup>
        </div>
        <div className="scrollbar-hide grid h-[200px] grow grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-[32px] overflow-y-scroll bg-[#E8F0EF]">
          {bookmarkElements}
        </div>
      </main>
    </>
  );
}

export default Main;
