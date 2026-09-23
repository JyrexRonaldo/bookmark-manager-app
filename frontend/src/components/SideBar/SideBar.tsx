import SidebarComponent from "../SideBarComponent/SideBarComponent";
import SidebarWrapper from "../SideBarWrapper/SideBarWrapper";
import { useMedia } from "react-use";
import { useSidebarStatus } from "../../store";

function Sidebar() {
  const isWide = useMedia("(min-width: 1024px)");
  const isOpen = useSidebarStatus()

  return isOpen && !isWide ? (
    <SidebarWrapper>
      <SidebarComponent isSmall={isWide} />
    </SidebarWrapper>
  ) : (
    <SidebarComponent isSmall={!isWide} />
  );
}

export default Sidebar;
