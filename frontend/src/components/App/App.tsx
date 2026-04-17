import SideBar from "../SideBar/SideBar";
import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";
import AddBookmark from "../AddBookmark/AddBookmark";
import { useState } from "react";

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <>
      <div className="grid h-screen grid-cols-5 grid-cols-[min-content_repeat(4,1fr)] grid-rows-[min-content_1fr]">
        <SideBar />
        <NavBar showAddForm={showAddForm} setShowAddForm={setShowAddForm} />
        <Main />
        {showAddForm && <AddBookmark showAddForm={showAddForm} setShowAddForm={setShowAddForm} />}
      </div>
    </>
  );
}

export default App;
