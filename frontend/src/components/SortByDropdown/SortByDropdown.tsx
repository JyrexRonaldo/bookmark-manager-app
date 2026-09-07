import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSortControls, useSortValue } from "../../store";
import type { SortVariableType } from "../../types";

function SortByDropdown() {
  const sortValue = useSortValue();
  const { setSortValue } = useSortControls();

  function handleSort(sortValue: SortVariableType) {
    setSortValue(sortValue);
  }

  return (
    <>
      <Menu>
        <MenuButton className="border-none outline-none focus:outline-none active:border-none active:outline-none">
          <div className="flex w-[107px] gap-[4px] rounded-[8px] border border-[#C0CFCC] bg-white px-[12px] py-[10px] text-[#051513] hover:bg-[#E8F0EF]">
            <img src="/img/icon-sort.svg" alt="" />{" "}
            <p className="font-manrope text-[16px]/[140%]">Sort by</p>
          </div>
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="border-none outline-none focus:outline-none active:border-none active:outline-none"
        >
          <div className="flex h-[132px] w-[200px] flex-col gap-[4px] rounded-[8px] border border-[#E8F0EF] bg-white p-[8px] font-manrope *:flex *:h-[36px] *:items-center *:justify-between *:rounded-[8px] *:p-[8px] *:hover:bg-[#E8F0EF]">
            <MenuItem>
              <button
                type="button"
                onClick={() => {
                  handleSort("recentlyAdded");
                }}
              >
                <p>Recently added</p>
                {sortValue === "recentlyAdded" && (
                  <img
                    src="/img/icon-check.svg"
                    className="size-[16px]"
                    alt=""
                  />
                )}
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                onClick={() => {
                  handleSort("recentlyVisited");
                }}
              >
                <p>Recently visited</p>
                {sortValue === "recentlyVisited" && (
                  <img
                    src="/img/icon-check.svg"
                    className="size-[16px]"
                    alt=""
                  />
                )}
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                onClick={() => {
                  handleSort("mostVisited");
                }}
              >
                <p>Most visited</p>
                {sortValue === "mostVisited" && (
                  <img
                    src="/img/icon-check.svg"
                    className="size-[16px]"
                    alt=""
                  />
                )}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}

export default SortByDropdown;
