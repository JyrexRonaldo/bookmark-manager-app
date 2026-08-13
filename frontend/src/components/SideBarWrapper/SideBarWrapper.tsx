import { useSideBarStatusControls } from "../../store";


function SideBarWrapper({ children }) {
  const { toggleSidebar } = useSideBarStatusControls();

  function handleSideBar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      toggleSidebar()
    }
  }
  return (
    <div
      onClick={handleSideBar}
      className="fixed z-10 flex h-screen w-full bg-[#131313]/50"
    >
      {children}
    </div>
  );
}

export default SideBarWrapper;
