import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";
import BookmarkForm from "../BookmarkForm/BookmarkForm";
import Sidebar from "../Sidebar/Sidebar";
import { useBookmarkFormStatus } from "../../store";
import { useEffect } from "react";
import { useTheme } from "../../store";

function App() {
  const bookmarkFormStatus = useBookmarkFormStatus();
  const theme = useTheme();

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.remove("dark");
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.add("dark");
      localStorage.setItem('theme', 'dark')
    }
  }, [theme]);

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
