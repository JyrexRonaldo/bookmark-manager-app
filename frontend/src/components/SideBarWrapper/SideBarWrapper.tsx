import { useContext } from "react";
import AddBookmarkContext from "../../contexts/AddBookmarkContext/AddBookmarkContext";

// const ConditionalWrapper = ({ condition, wrapper, children }) =>
//   condition ? wrapper(children) : children;

// // Usage:
// <ConditionalWrapper
//   condition={isLoggedIn}
//   wrapper={children => <div className="profile-container">{children}</div>}
// >
//   <UserProfile />
// </ConditionalWrapper>

function SideBarWrapper({ children }) {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(AddBookmarkContext);

  function handleSideBar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      setIsSideBarOpen(!isSideBarOpen);
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
