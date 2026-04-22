import SideBarComponent from "../SideBarComponent/SideBarComponent";
import SideBarWrapper from "../SideBarWrapper/SideBarWrapper";
import { useMedia } from "react-use";

function SideBar({ isOpem }) {
  const isWide = useMedia("(min-width: 1024px)");

  return isOpem && !isWide ? (
    <SideBarWrapper>
      <SideBarComponent isSmall={isWide} />
    </SideBarWrapper>
  ) : (
    <SideBarComponent isSmall={!isWide} />
  );
}

export default SideBar;
