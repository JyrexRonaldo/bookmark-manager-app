import TagComponent from "../TagComponent/TagComponent";
import clsx from "clsx";
import { useAllTagsData } from "../../store";

function SideBarComponent({ isSmall }) {
  const allTagsData = useAllTagsData();

  const TagElements = allTagsData.map((element, index) => (
    <TagComponent key={index} tagName={element.title} tagCount={element.count} />
  ));

  return (
    <>
      <aside
        className={clsx(
          "fixed z-1 col-start-1 col-end-2 row-start-1 row-end-3",
          { hidden: isSmall },
          "flex h-screen flex-col gap-[16px] border-r border-[#DDE9E7] bg-white lg:static lg:flex",
        )}
      >
        <div className="px-[20px] pt-[20px] pb-[10px]">
          <img src="/img/logo-light-theme.svg" alt="" />
        </div>
        <section className="flex min-h-[0px] grow flex-col gap-[16px] px-[16px] pt-[0px] pb-[20px]">
          <div className="flex h-[84px] w-[264px] flex-col gap-1">
            <button className="flex h-[38px] w-full items-center gap-[12px] rounded-[6px] border-[#E8F0EF] bg-[#E8F0EF] px-[8px] px-[12px] hover:bg-[#E8F0EF]">
              <img src="/img/icon-home.svg" alt="" />
              <p className="font-manrope">Home</p>
            </button>
            <button className="flex h-[38px] w-full items-center gap-[12px] rounded-[6px] px-[8px] px-[12px] hover:bg-[#E8F0EF]">
              <img src="/img/icon-archive.svg" alt="" />
              <p className="font-manrope">Archived</p>
            </button>
          </div>
          <div className="flex grow flex-col">
            <div className="flex justify-between px-[12px] text-[12px]/[140%]">
              <p>TAGS</p>
              <p>Reset</p>
            </div>
            <div className="h-[200px] grow overflow-auto">
              {TagElements}
              {/* <TagComponent />
                <TagComponent />
                <TagComponent />
                <TagComponent />
                <TagComponent />
                <TagComponent />
                <TagComponent />
                <TagComponent />
                <TagComponent /> */}
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}

export default SideBarComponent;
