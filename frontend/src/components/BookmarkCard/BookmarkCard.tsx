function BookmarkCard({title, url, description, tags, visitCount, createdAt, lastVisited, favicon }) {

  const tagElements = tags.map((tag, index) => <p key={index} className="rounded-[4px] bg-[#E8F0EF] px-[8px] py-[2px] text-[12px]/[140%] font-manrope text-[#131313]">
            {tag}
          </p> )

  return (
    <div className="max-h-[272px] rounded-[12px] bg-white">
      <div className="flex flex-col gap-[16px] p-[16px]">
        <div className="flex justify-between gap-[12px]">
          <img
            className="size-[44px] rounded-[8px] border border-[#E8F0EF]"
            src={favicon}
            alt=""
          />
          <div className="flex grow flex-col gap-[4px]">
            <p className="text-[20px]/[120%] font-bold font-manrope">{title}</p>
            <p className="text-[12px]/[140%] font-manrope">{url}</p>
          </div>

          <button className="flex size-[32px] items-center justify-center rounded-[8px] border border-[#C0CFCC]">
            <img src="/img/icon-menu-bookmark.svg" alt="" />
          </button>
        </div>
        <hr className="text-[#DDE9E7]" />

        <p className="text-[14px]/[150%] font-manrope text-[#4C5C59]">
          {description}
        </p>
        <div className="flex gap-[8px]">
          {tagElements}
        </div>
      </div>
      <hr className="text-[#DDE9E7]" />
      <div className="flex justify-between gap-[8px] p-[12px]">
        <div className="flex gap-[16px] *:flex *:items-center *:font-manrope *:gap-2 *:text-[12px]/[140%]">
          <div>
            <img
              className="size-[12px]"
              src="/img/icon-visit-count.svg"
              alt=""
            />
            <p>{visitCount}</p>
          </div>
          <div>
            <img
              className="size-[12px]"
              src="/img/icon-last-visited.svg"
              alt=""
            />
            <p>{lastVisited}</p>
          </div>
          <div>
            <img
              className="size-[12px]"
              src="/img/icon-created.svg"
              alt=""
            />
            <p>{createdAt}</p>
          </div>
        </div>
        <img className="size-[16px]" src="/img/icon-pin.svg" alt="" />
      </div>
    </div>
  );
}

export default BookmarkCard;
