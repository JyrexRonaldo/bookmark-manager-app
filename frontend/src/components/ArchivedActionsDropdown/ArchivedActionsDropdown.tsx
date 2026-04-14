function ArchivedActionsDropdown() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#131313]/70">
        <div className="flex h-[172px] w-[200px] flex-col gap-[4px] rounded-[8px] bg-white p-[8px] font-manrope *:flex *:h-[36px] *:items-center *:gap-[10px] *:p-[8px] *:text-[14px]/[140%]">
          <div>
            <img src="/img/icon-visit.svg" alt="" />
            <p>Visit</p>
          </div>
          <div>
            <img src="/img/icon-copy.svg" alt="" />
            <p>Copy URL</p>
          </div>
          <div>
            <img src="/img/icon-unarchive.svg" alt="" />
            <p>Unarchive</p>
          </div>
          <div>
            <img src="/img/icon-delete.svg" alt="" />
            <p>Delete Permanently</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArchivedActionsDropdown;
