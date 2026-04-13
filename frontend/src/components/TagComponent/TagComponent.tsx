function TagComponent() {
  return (
    <>
      <div className="flex h-[38px] items-center justify-between gap-[12px] px-[12px] py-[8px]">
        <div className="flex grow items-center gap-[8px]">
          <input
            type="checkbox"
            className="relative size-[16px] appearance-none rounded-[4px] border border-[#899492] before:invisible before:absolute before:top-[-1px] before:right-[-1px] before:size-[16px] before:rounded-[4px] before:bg-[#014745] before:text-[1.2em] after:invisible after:absolute after:top-[-5px] after:text-white after:content-['✓'] checked:before:visible checked:after:visible"
          />
          <p className="text-[16px]/[140%] font-semibold">Compatibility</p>
        </div>
        <p className="flex h-[21px] w-[24px] items-center justify-center rounded-[9999px] border border-[#DDE9E7] bg-[#E8F0EF] px-[8px] py-[2px] text-[12px]/[140%]">
          50
        </p>
      </div>
    </>
  );
}

export default TagComponent;
