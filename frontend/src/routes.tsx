import AddBookmark from "./components/AddBookmark/AddBookmark";
import ActionsDropdown from "./components/ActionsDropdown/ActionsDropdown";
import App from "./components/App/App";
import ArchivedActionsDropdown from "./components/ArchivedActionsDropdown/ArchivedActionsDropdown";
import Dialog from "./components/Dialog/Dialog";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ProfileMenu from "./components/ProfileMenu/ProfileMenu";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import SortByDropdown from "./components/SortByDropdown/SortByDropdown";
import Toast from "./components/Toast/Toast";
 

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/forget",
    element: <ForgetPassword />,
  },
   {
    path: "/test",
    element: <AddBookmark />,
  },
];

export default routes;