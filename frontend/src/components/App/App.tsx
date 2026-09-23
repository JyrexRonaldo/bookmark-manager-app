import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";
import BookmarkForm from "../BookmarkForm/BookmarkForm";
import Sidebar from "../SideBar/SideBar.tsx";
import { useBookmarkFormStatus } from "../../store";
import { useEffect } from "react";
import { useTheme } from "../../store";
import { useNavigate } from "react-router";

function App() {
  const bookmarkFormStatus = useBookmarkFormStatus();
  const theme = useTheme();
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('email') === null) {
            navigate('/signin')
        }
    if (theme === 'light') {
      document.body.classList.remove("dark");
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.add("dark");
      localStorage.setItem('theme', 'dark')
    }
  }, [theme, navigate]);

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
