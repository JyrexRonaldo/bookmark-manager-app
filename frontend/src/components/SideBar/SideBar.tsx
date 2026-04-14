import TagComponent from "../TagComponent/TagComponent";

function SideBar() {
  return (
    <>
      <aside className="hidden h-screen min-w-[296px] flex-col gap-[16px] border-r border-[#DDE9E7] lg:flex">
        <div className="px-[20px] pt-[20px] pb-[10px]">
          <img src="/img/logo-light-theme.svg" alt="" />
        </div>
        <section className="flex flex-col gap-[16px] px-[16px] pt-[0px] pb-[20px]">
          <div className="h-[84px] w-[264px]">
            <button className="flex h-[38px] w-full items-center gap-[12px] rounded-[6px] border-[#E8F0EF] bg-[#E8F0EF] px-[8px] px-[12px]">
              <img src="/img/icon-home.svg" alt="" />
              <p className="font-manrope">Home</p>
            </button>
            <button className="flex h-[38px] w-full items-center gap-[12px] rounded-[6px] px-[8px] px-[12px]">
              <img src="/img/icon-archive.svg" alt="" />
              <p className="font-manrope">Archived</p>
            </button>
          </div>
          <div>
            <div className="flex justify-between px-[12px] text-[12px]/[140%]">
              <p>TAGS</p>
              <p>Reset</p>
            </div>
            <div>
              <TagComponent />
              <TagComponent />
              <TagComponent />
              <TagComponent />
              <TagComponent />
              <TagComponent />
              <TagComponent />
              <TagComponent />
              <TagComponent />
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}

export default SideBar;
