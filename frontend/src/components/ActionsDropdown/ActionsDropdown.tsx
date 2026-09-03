import { useAllBookmarkDataControls } from "../../store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { updateArchiveStatus } from "../../services";
import { handleVisitButton, handleCopyUrlButton } from "../../utils";

function ActionsDropdown({
  currentView,
  id,
  isArchived,
  url,
}: {
  currentView: boolean;
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
          <div className="flex w-50 flex-col gap-1 rounded-lg border border-[#E8F0EF] bg-white p-2 font-manrope drop-shadow-[0px_6px_14px_#2226271A] *:flex *:h-9 *:items-center *:gap-2.5 *:rounded-lg *:p-2 *:text-[14px]/[140%] *:hover:bg-[#E8F0EF]">
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
            <></>
            {currentView ? (
              <>
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
              </>
            ) : (
              <>
                <MenuItem>
                  <button>
                    <img src="/img/icon-unarchive.svg" alt="" />
                    <p>Unarchive</p>
                  </button>
                </MenuItem>
                <MenuItem>
                  <div>
                    <img src="/img/icon-delete.svg" alt="" />
                    <p>Delete Permanently</p>
                  </div>
                </MenuItem>
              </>
            )}
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}

export default ActionsDropdown;
