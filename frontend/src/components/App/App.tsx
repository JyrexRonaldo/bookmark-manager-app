import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";
import BookmarkForm from "../BookmarkForm/BookmarkForm";
import Sidebar from "../Sidebar/Sidebar";
import { useBookmarkFormStatus } from "../../store";

function App() {
  const bookmarkFormStatus = useBookmarkFormStatus();

  return (
    <>
      <div className="grid h-screen grid-cols-5 grid-cols-[min-content_repeat(4,1fr)] grid-rows-[min-content_1fr]">
        <Sidebar />
        <NavBar />
        <Main />
        {bookmarkFormStatus && <BookmarkForm />}
      </div>
    </>
  );
}

export default App;
