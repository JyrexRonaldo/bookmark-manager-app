import { useAllTagsControls } from "../../store";

function TagComponent({
  tagName,
  tagCount = 0,
  checkboxState = false,
}: {
  tagName: string;
  tagCount: number;
  checkboxState: boolean;
}) {
  const { toggleSelectedTags } = useAllTagsControls();

  function handleCheckbox() {
    toggleSelectedTags(tagName);
  }

  return (
    <>
      <div className="flex h-[38px] items-center justify-between gap-[12px] rounded-[8px] px-[12px] py-[8px] hover:bg-[#E8F0EF]">
        <div className="flex grow items-center gap-[8px]">
          <input
            type="checkbox"
            className="relative size-[16px] appearance-none rounded-[4px] border border-[#899492] before:invisible before:absolute before:top-[-1px] before:right-[-1px] before:size-[16px] before:rounded-[4px] before:bg-[#014745] before:text-[1.2em] after:invisible after:absolute after:top-[-5px] after:text-white after:content-['✓'] checked:before:visible checked:after:visible"
            onChange={handleCheckbox}
            checked={checkboxState}
          />
          <p className="font-manrope text-[16px]/[140%]">{tagName}</p>
        </div>
        <p className="flex h-[21px] w-[24px] items-center justify-center rounded-[9999px] border border-[#DDE9E7] bg-[#E8F0EF] px-[8px] py-[2px] text-[12px]/[140%]">
          {tagCount}
        </p>
      </div>
    </>
  );
}

export default TagComponent;
