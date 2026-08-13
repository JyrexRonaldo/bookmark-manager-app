function ActionsDropdown() {
  return (
    <>
      
      <div className="flex *:hover:bg-[#E8F0EF] h-53 w-50 flex-col gap-1 rounded-lg *:rounded-lg border border-[#E8F0EF] bg-white p-2 font-manrope drop-shadow-[0px_6px_14px_#2226271A] *:flex *:h-9 *:items-center *:gap-2.5 *:p-2 *:text-[14px]/[140%]">
        <div>
          <img src="/img/icon-visit.svg" alt="" />
          <p>Visit</p>
        </div>
        <div>
          <img src="/img/icon-copy.svg" alt="" />
          <p>Copy URL</p>
        </div>
        <div>
          <img src="/img/icon-pin.svg" alt="" />
          <p>Pin</p>
        </div>
        <div>
          <img src="/img/icon-edit.svg" alt="" />
          <p>Edit</p>
        </div>
        <div>
          <img src="/img/icon-archive.svg" alt="" />
          <p>Archive</p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default ActionsDropdown;
