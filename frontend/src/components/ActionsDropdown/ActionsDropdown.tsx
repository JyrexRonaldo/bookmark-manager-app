function ActionsDropdown() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#131313]/70">
        <div className="flex h-[212px] w-[200px] flex-col gap-[4px] rounded-[8px] bg-white p-[8px] *:flex *:h-[36px] *:items-center *:gap-[10px] *:p-[8px] *:text-[14px]/[140%]">
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
      </div>
    </>
  );
}

export default ActionsDropdown;
