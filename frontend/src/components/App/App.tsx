// import SideBar from "../SideBarComponent/SideBarComponent";
import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";
import AddBookmark from "../AddBookmark/AddBookmark";
import { useState } from "react";
// import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";
import SideBar from "../SideBar/SideBar";
import AddBookmarkContext from "../../contexts/AddBookmarkContext/AddBookmarkContext";

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <div className="grid h-screen grid-cols-5 grid-cols-[min-content_repeat(4,1fr)] grid-rows-[min-content_1fr]">
        <AddBookmarkContext
          value={{
            showAddForm,
            setShowAddForm,
            isSideBarOpen,
            setIsSideBarOpen,
          }}
        >
          {/* <SideBar /> */}
          {/* <SideBarWrapper> */}
          <SideBar isOpem={isSideBarOpen} />
          {/* </SideBarWrapper> */}
          <NavBar />
          <Main />
          {showAddForm && <AddBookmark />}
        </AddBookmarkContext>
      </div>
    </>
  );
}

export default App;
