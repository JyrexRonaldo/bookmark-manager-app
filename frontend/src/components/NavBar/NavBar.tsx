function NavBar() {
  return (
    <>
      <nav className="flex w-auto items-center gap-[10px] px-[16px] py-[12px]">
        <button className="flex size-[40px] items-center justify-center rounded-[8px] border border-[#C0CFCC] lg:hidden">
          <img src="/img/icon-menu-hamburger.svg" alt="" />
        </button>
        <div className="mr-auto flex h-[41px] w-[60px] max-w-[60%] flex-auto gap-[8px] rounded-[8px] border border-[#DDE9E7] px-[12px] py-[10px] sm:max-w-[40%]">
          <img
            className="min-w-[20px]"
            src="/img/icon-search.svg"
            alt="magnifying glass"
          />
          <input
            className="h-[21px] w-full truncate text-[14px]/[150%] outline-none"
            type="text"
            placeholder="Search by title..."
          />
        </div>
        <div className="flex gap-[10px]">
          <button className="flex min-w-[40px] items-center justify-center gap-[4px] rounded-[8px] bg-[#014745] px-[16px] py-[12px] text-white">
            <img
              className="size-[20px] self-center"
              src="/img/icon-add.svg"
              alt=""
            />
            <p className="hidden sm:block">Add Bookmark</p>
          </button>
          <img className="size-[40px]" src="/img/image-avatar.webp" alt="" />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
