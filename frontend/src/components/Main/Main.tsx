import BookmarkCard from "../BookmarkCard/BookmarkCard";

function Main() {
  return (
    <>
      <main className="bg-yellow-600 h-full">
        <div>
          <p>All bookmarks</p>
          <button>
            <img src="" alt="" /> <p>Sort by</p>
          </button>
        </div>
        <div>
          <BookmarkCard />
        </div>
      </main>
    </>
  );
}

export default Main;
