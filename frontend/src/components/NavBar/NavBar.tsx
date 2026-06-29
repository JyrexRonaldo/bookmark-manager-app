import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { useContext } from "react";
import BookmarkFormContext from "../../contexts/BookmarkFormContext/BookmarkFormContext";
import SideBarContext from "../../contexts/SideBarContext/SideBarContext";

function NavBar() {
  const [showAddForm, setShowAddForm] = useContext(BookmarkFormContext);
  const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext);
  function handleAddBookmark() {
    setShowAddForm(!showAddForm);
  }

  function handleSideBar() {
    setIsSideBarOpen(!isSideBarOpen);
    console.log("open sesame");
  }

  return (
    <>
      <nav className="col-start-2 col-end-6 row-start-1 row-end-2 flex w-auto items-center gap-[10px] px-[16px] py-[12px]">
        <button
          onClick={handleSideBar}
          className="flex size-[40px] items-center justify-center rounded-[8px] border border-[#C0CFCC] lg:hidden"
        >
          <img src="/img/icon-menu-hamburger.svg" alt="" />
        </button>
        <div className="mr-auto flex h-[41px] w-[60px] max-w-[60%] flex-auto gap-[8px] rounded-[8px] border border-[#DDE9E7] px-[12px] py-[10px] hover:bg-[#E8F0EF] has-focus:bg-[#E8F0EF] has-focus:outline-4 has-focus:outline-[#E8F0EF] sm:max-w-[40%]">
          <img
            className="min-w-[20px]"
            src="/img/icon-search.svg"
            alt="magnifying glass"
          />
          <input
            className="h-[21px] w-full truncate font-manrope text-[14px]/[150%] font-medium tracking-[1%] outline-none"
            type="text"
            placeholder="Search by title..."
          />
        </div>
        <div className="relative flex items-center gap-[10px]">
          <button
            onClick={handleAddBookmark}
            className="flex min-w-[40px] items-center justify-center gap-[4px] rounded-[8px] bg-[#014745] px-[16px] py-[12px] text-white"
          >
            <img
              className="size-[20px] self-center"
              src="/img/icon-add.svg"
              alt=""
            />
            <p className="hidden font-[semibold] font-manrope text-[16px]/[140%] sm:block">
              Add Bookmark
            </p>
          </button>
          <button popoverTarget="profilemenu">
            <img className="size-[40px]" src="/img/image-avatar.webp" alt="" />
          </button>
          <ProfileMenu />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
