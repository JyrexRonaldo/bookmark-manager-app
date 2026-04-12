function BookmarkCard() {
  return (
    <div className="max-h-[272px] min-w-[338px] rounded-[12px] bg-white">
      <div className="flex flex-col gap-[16px] p-[16px]">
        <div className="flex justify-between gap-[12px]">
          <img
            className="size-[44px] rounded-[8px] border border-[#E8F0EF]"
            src="/img/favicon-frontend-mentor.png"
            alt=""
          />
          <div className="flex grow flex-col gap-[4px]">
            <p className="text-[20px]/[120%] font-bold">Frontend Mentor</p>
            <p className="text-[12px]/[140%]">frontendmentor.io</p>
          </div>

          <button className="flex size-[32px] items-center justify-center rounded-[8px] border border-[#C0CFCC]">
            <img src="/img/icon-menu-bookmark.svg" alt="" />
          </button>
        </div>
        <hr className="text-[#DDE9E7]" />

        <p className="text-[14px]/[150%] text-[#4C5C59]">
          Improve your front-end coding skills by building real projects. Solve
          real-world HTML, CSS and JavaScript challenges whilst working to
          professional designs.
        </p>
        <div className="flex gap-[8px]">
          <p className="rounded-[4px] bg-[#E8F0EF] px-[8px] py-[2px] text-[12px]/[140%] text-[#131313]">
            Practice
          </p>
          <p className="rounded-[4px] bg-[#E8F0EF] px-[8px] py-[2px] text-[12px]/[140%] text-[#131313]">
            Learning
          </p>
          <p className="rounded-[4px] bg-[#E8F0EF] px-[8px] py-[2px] text-[12px]/[140%] text-[#131313]">
            Community
          </p>
        </div>
      </div>
      <hr className="text-[#DDE9E7]" />
      <div className="flex justify-between gap-[8px] p-[12px]">
        <div className="flex gap-[16px] *:flex *:items-center *:gap-2 *:text-[12px]/[140%]">
          <div>
            <img
              className="size-[12px]"
              src="/img/icon-visit-count.svg"
              alt=""
            />
            <p>152</p>
          </div>
          <div>
            <img
              className="size-[12px]"
              src="/img/icon-last-visited.svg"
              alt=""
            />
            <p>24 Sep</p>
          </div>
          <div>
            <img
              className="size-[12px]"
              src="/img/icon-created.svg"
              alt=""
            />
            <p>10 Jan</p>
          </div>
        </div>
        <img className="size-[16px]" src="/img/icon-pin.svg" alt="" />
      </div>
    </div>
  );
}

export default BookmarkCard;
