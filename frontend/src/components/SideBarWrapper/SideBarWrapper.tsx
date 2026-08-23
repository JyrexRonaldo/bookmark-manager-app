import { useSidebarStatusControls } from "../../store";


function SidebarWrapper({ children } : { children:  React.ReactNode; }) {
  const { toggleSidebar } = useSidebarStatusControls();

  function handleSidebar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      toggleSidebar()
    }
  }
  return (
    <div
      onClick={handleSidebar}
      className="fixed z-10 flex h-screen w-full bg-[#131313]/50"
    >
      {children}
    </div>
  );
}

export default SidebarWrapper;
