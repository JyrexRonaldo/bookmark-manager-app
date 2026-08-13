import SideBarComponent from "../SideBarComponent/SideBarComponent";
import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";
import { useMedia } from "react-use";
import { useSideBarStatus } from "../../store";

function SideBar() {
  const isWide = useMedia("(min-width: 1024px)");
  const isOpen = useSideBarStatus()

  return isOpen && !isWide ? (
    <SideBarWrapper>
      <SideBarComponent isSmall={isWide} />
    </SideBarWrapper>
  ) : (
    <SideBarComponent isSmall={!isWide} />
  );
}

export default SideBar;
