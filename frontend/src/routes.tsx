import App from "./components/App/App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";


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
];

export default routes;