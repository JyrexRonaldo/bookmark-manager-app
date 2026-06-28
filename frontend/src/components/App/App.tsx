// import SideBar from "../SideBarComponent/SideBarComponent";
import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";
import AddBookmark from "../AddBookmark/AddBookmark";
import { useState } from "react";
// import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";
import SideBar from "../SideBar/SideBar";
import BookmarkFormContext from "../../contexts/BookmarkFormContext/BookmarkFormContext";
import BookmarkDataContext from "../../contexts/BookmarkDataContext/BookmarkDataContaxt";
import SideBarContext from "../../contexts/SideBarContext/SideBarContext";
import { type AllBookmarksData } from "../../types";

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [allBookmarkData, setAllBookmarkData] = useState<AllBookmarksData[]>(
    [],
  );
  return (
    <>
      <div className="grid h-screen grid-cols-5 grid-cols-[min-content_repeat(4,1fr)] grid-rows-[min-content_1fr]">
        <BookmarkFormContext
          value={[
            showAddForm,
            setShowAddForm,
          ]}
        >
          <SideBarContext value={{ isSideBarOpen, setIsSideBarOpen }}>
            {/* <SideBar /> */}
            {/* <SideBarWrapper> */}
            <SideBar isOpem={isSideBarOpen} />
            {/* </SideBarWrapper> */}
            <NavBar />
            <BookmarkDataContext value={[allBookmarkData, setAllBookmarkData]}>
              <Main />
              {showAddForm && <AddBookmark />}
            </BookmarkDataContext>
          </SideBarContext>
        </BookmarkFormContext>
      </div>
    </>
  );
}

export default App;
