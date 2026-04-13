function SortByDropdown() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#131313]/70">
        <div className="flex h-[132px] w-[200px] flex-col gap-[4px] rounded-[8px] border border-[#E8F0EF] bg-white p-[8px] *:flex *:h-[36px] *:items-center *:justify-between *:p-[8px]">
          <div>
            <p>Recently added</p>
            <img src="/img/icon-check.svg" className="size-[16px]" alt="" />
          </div>
          <div>
            <p>Recently visited</p>
            <img src="" alt="" />
          </div>
          <div>
            <p>Most visited</p>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SortByDropdown;
