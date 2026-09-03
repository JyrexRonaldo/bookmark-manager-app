import { useAllBookmarkDataControls } from "../../store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { updateArchiveStatus } from "../../services";

function ActionsDropdown({
  id,
  isArchived,
  url,
}: {
  id: string;
  isArchived: boolean;
  url: string;
}) {
  const { archiveBookmark } = useAllBookmarkDataControls();

  function handleArchiveButton() {
    console.log("archive");
    archiveBookmark(id);
    updateArchiveStatus(id, !isArchived);
  }

  async function handleCopyUrlButton() {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  }

  async function handleVisitButton() {
    window.location.href = `${url}`;
  }

  return (
    <>
      <Menu>
        <MenuButton className="border-none outline-none focus:outline-none active:border-none active:outline-none">
          <div className="flex size-[32px] shrink-0 items-center justify-center rounded-[8px] border border-[#C0CFCC] hover:bg-[#E8F0EF] focus:bg-[#E8F0EF] focus:outline-4 focus:outline-[#E8F0EF]">
            <img src="/img/icon-menu-bookmark.svg" alt="" />
          </div>
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="border-none outline-none focus:outline-none active:border-none active:outline-none"
        >
          <div className="flex h-53 w-50 flex-col gap-1 rounded-lg border border-[#E8F0EF] bg-white p-2 font-manrope drop-shadow-[0px_6px_14px_#2226271A] *:flex *:h-9 *:items-center *:gap-2.5 *:rounded-lg *:p-2 *:text-[14px]/[140%] *:hover:bg-[#E8F0EF]">
            <MenuItem>
              <button onClick={handleVisitButton} type="button">
                <img src="/img/icon-visit.svg" alt="" />
                <p>Visit</p>
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={handleCopyUrlButton} type="button">
                <img src="/img/icon-copy.svg" alt="" />
                <p>Copy URL</p>
              </button>
            </MenuItem>
            <MenuItem>
              <button type="button">
                <img src="/img/icon-pin.svg" alt="" />
                <p>Pin</p>
              </button>
            </MenuItem>
            <MenuItem>
              <button type="button">
                <img src="/img/icon-edit.svg" alt="" />
                <p>Edit</p>
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={handleArchiveButton} type="button">
                <img src="/img/icon-archive.svg" alt="" />
                <p>Archive</p>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      {/* </div> */}
    </>
  );
}

export default ActionsDropdown;
