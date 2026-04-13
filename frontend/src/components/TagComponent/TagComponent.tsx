function TagComponent() {
  return (
    <>
      <div className="flex h-[38px] items-center justify-between gap-[12px] px-[12px] py-[8px]">
        <div className="flex grow gap-[8px] items-center">
          <input type="checkbox" />
          <p className="text-[16px]/[140%] font-semibold">Compatibility</p>
        </div>
        <p className="flex size-[21px] items-center justify-center rounded-[9999px] border border-[#DDE9E7] bg-[#E8F0EF] px-[8px] py-[2px] text-[12px]/[140%]">
          50
        </p>
      </div>
    </>
  );
}

export default TagComponent;
