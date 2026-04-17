import SideBar from "../SideBar/SideBar";
import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";

function App() {
  return (
    <>
      <div className="grid h-screen grid-cols-5 grid-cols-[min-content_repeat(4,1fr)] grid-rows-[min-content_1fr]">
        <SideBar />
        {/* <div className="col-start-2 col-end-6 "> */}
        <NavBar />
        <Main />
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
