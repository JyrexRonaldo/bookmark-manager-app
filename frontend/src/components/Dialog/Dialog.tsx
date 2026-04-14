function Dialog() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#131313]/70">
        <div className="flex h-[181px] w-[450px] flex-col gap-[24px] rounded-[12px] bg-white p-[24px]">
          <div>
            <div className="flex justify-between text-[24px]/[140%]">
              <p className="font-manrope text-[24px]/[140%] font-bold">
                Archive bookmark
              </p>
              <img src="/img/icon-close.svg" alt="" />
            </div>
            <p className="font-manrope text-[14px]/[150%] font-medium tracking-[1%] text-[#4C5C59]">
              Are you sure you want to archive this bookmark?
            </p>
          </div>
          <div className="flex justify-end gap-[16px] *:rounded-[8px] *:px-[16px] *:py-[12px]">
            <button className="border border-[#C0CFCC]">Cancel</button>
            <button className="bg-[#014745] text-white">Archive</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dialog;
