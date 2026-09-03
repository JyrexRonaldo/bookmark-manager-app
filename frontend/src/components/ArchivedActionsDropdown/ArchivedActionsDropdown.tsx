import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { handleVisitButton, handleCopyUrlButton } from "../../utils";

function ArchivedActionsDropdown({
  // id,
  // isArchived,
  url,
}: {
  id: string;
  isArchived: boolean;
  url: string;
}) {
  return (
    <>
      <Menu>
        <MenuButton>
          <div className="flex size-[32px] shrink-0 items-center justify-center rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF] focus:bg-[#E8F0EF] focus:outline-4 focus:outline-[#E8F0EF]">
            <img src="/img/icon-menu-bookmark.svg" alt="" />
          </div>
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="border-none outline-none focus:outline-none active:border-none active:outline-none"
        >
          <div className="flex h-[172px] w-[200px] flex-col gap-[4px] rounded-[8px] bg-white p-[8px] font-manrope *:flex *:h-[36px] *:items-center *:gap-[10px] *:p-[8px] *:text-[14px]/[140%]">
            <MenuItem>
              <button onClick={() => handleVisitButton(url)} type="button">
                <img src="/img/icon-visit.svg" alt="" />
                <p>Visit</p>
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={() => handleCopyUrlButton(url)} type="button">
                <img src="/img/icon-copy.svg" alt="" />
                <p>Copy URL</p>
              </button>
            </MenuItem>
            <MenuItem>
              <div>
                <img src="/img/icon-unarchive.svg" alt="" />
                <p>Unarchive</p>
              </div>
            </MenuItem>
            <MenuItem>
              <div>
                <img src="/img/icon-delete.svg" alt="" />
                <p>Delete Permanently</p>
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}

export default ArchivedActionsDropdown;
