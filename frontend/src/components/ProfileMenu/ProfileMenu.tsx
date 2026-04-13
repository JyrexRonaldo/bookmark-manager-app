function ProfileMenu() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#131313]/70">
        <div className="flex w-[248px] flex-col gap-[4px] rounded-[8px] border border-[#E8F0EF] bg-white">
          <div className="flex h-[65px] items-center gap-[12px] border-b border-b-[#E8F0EF] px-[16px] py-[12px]">
            <div>
              <img
                src="/img/image-avatar.webp"
                className="size-[40px]"
                alt=""
              />
            </div>
            <div>
              <p className="text-[14px]/[140%] font-semibold">Emily Carter</p>
              <p className="text-[14px]/[150%] tracking-[1%]">
                emily101@gmail.com
              </p>
            </div>
          </div>
          <div className="flex h-[46px] items-center gap-[10px] px-[16px] py-[4px]">
            <img src="/img/icon-theme.svg" alt="" />
            <p className="grow text-[14px]/[140%]">Theme</p>
            <div className="flex h-[30px] w-[64px] items-center rounded-[4px] bg-[#DDE9E7] p-[2px]">
              <img
                className="h-[26px] w-[30px] rounded-[4px] bg-white px-[8px] py-[6px]"
                src="/img/icon-light-theme.svg"
                alt=""
              />
              <img
                className="h-[26px] w-[30px] rounded-[4px] px-[8px] py-[6px]"
                src="/img/icon-dark-theme.svg"
                alt=""
              />
            </div>
          </div>
          <div className="flex h-[36px] items-center gap-[10px] border-t border-t-[#E8F0EF] px-[16px] py-[4px]">
            <img src="/img/icon-logout.svg" alt="" />
            <p className="text-[14px]/[140%]">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMenu;
