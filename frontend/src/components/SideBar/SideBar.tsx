import SidebarComponent from "../SidebarComponent/SidebarComponent";
import SidebarWrapper from "../SidebarWrapper/SidebarWrapper";
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
