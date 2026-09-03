import ActionsDropdown from "../ActionsDropdown/ActionsDropdown";
import { type BookmarkData } from "../../types";
import { useCurrentView } from "../../store";
import ArchivedActionsDropdown from "../ArchivedActionsDropdown/ArchivedActionsDropdown";

function BookmarkCard({
  id,
  title,
  url,
  favicon,
  description,
  pinned,
  tags,
  visitCount,
  createdAt,
  lastVisited,
  isArchived,
}: Omit<BookmarkData, "createdAt"> & {
  createdAt: string;
}) {
  const currentView = useCurrentView();
  const tagElements = tags.split(",").map((tag: string, index: number) => (
    <p
      key={index}
      className="rounded-[4px] bg-[#E8F0EF] px-[8px] py-[2px] font-manrope text-[12px]/[140%] text-[#131313]"
    >
      {tag}
    </p>
  ));

  return (
    <div className="flex max-h-[272px] flex-col justify-between rounded-[12px] bg-white">
      <div className="flex flex-col gap-[16px] p-[16px]">
        <div className="relative flex justify-between gap-[12px]">
          <img
            className="size-[44px] rounded-[8px] border border-[#E8F0EF]"
            src={favicon}
            alt=""
          />
          <div className="flex grow flex-col gap-[4px]">
            <p className="font-manrope text-[20px]/[120%] font-bold">{title}</p>
            <p className="font-manrope text-[12px]/[140%]">{url}</p>
          </div>
          {currentView ? (
            <ActionsDropdown id={id} isArchived={isArchived} url={url} />
          ) : (
            <ArchivedActionsDropdown id={id} isArchived={isArchived} url={url}/>
          )}
        </div>
        <hr className="text-[#DDE9E7]" />

        <p className="font-manrope text-[14px]/[150%] text-[#4C5C59]">
          {description}
        </p>
        <div className="flex flex-wrap gap-[8px]">{tagElements}</div>
      </div>
      {/* <hr className="text-[#DDE9E7]" /> */}
      <div className="flex justify-between gap-[8px] border-t-1 border-t-[#DDE9E7] p-[12px]">
        <div className="flex gap-[16px] *:flex *:items-center *:gap-2 *:font-manrope *:text-[12px]/[140%]">
          <div>
            <img
              className="size-[12px]"
              src="/img/icon-visit-count.svg"
              alt=""
            />
            <p>{visitCount}</p>
          </div>
          {lastVisited && (
            <div>
              <img
                className="size-[12px]"
                src="/img/icon-last-visited.svg"
                alt=""
              />
              <p>{lastVisited}</p>
            </div>
          )}
          <div>
            <img className="size-[12px]" src="/img/icon-created.svg" alt="" />
            <p>{createdAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isArchived && (
            <p className="rounded-[4px] bg-[#E8F0EF] px-[8px] py-[2px] font-manrope text-[12px]/[140%] text-[#131313]">
              Archived
            </p>
          )}
          {pinned && (
            <img className="size-[16px]" src="/img/icon-pin.svg" alt="" />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;
