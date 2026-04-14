function Toast() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#131313]/70">
        <div className="flex h-[41px] w-[340px] items-center gap-[8px] rounded-[8px] bg-white px-[12px] py-[10px]">
          <img src="/img/icon-check.svg" alt="" />
          <p className="grow text-[14px]/[150%] tracking-[1%] font-medium font-manrope">
            Bookmark added successfully
          </p>
          <img src="/img/icon-close.svg" alt="" />
        </div>
      </div>
    </>
  );
}

export default Toast;
