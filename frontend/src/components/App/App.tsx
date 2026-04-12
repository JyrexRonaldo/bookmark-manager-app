import SideBar from "../SideBar/SideBar";
import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex flex-col grow">
          <NavBar />
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
