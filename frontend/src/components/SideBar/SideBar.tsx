import TagComponent from "../TagComponent/TagComponent";

function SideBar() {
  return (
    <>
      <aside className="min-w-[296px] bg-red-600 hidden lg:block" ><div></div>
      <div>
        <button>
            <img src="" alt="" />
            <p></p>
        </button>
        <button>
            <img src="" alt="" />
            <p></p>
        </button>
      </div>
      <div>
        <p></p>
            <div>
                <TagComponent />
            </div>
        </div></aside>
    </>
  );
}

export default SideBar;
