import App from "./components/App/App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
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
];

export default routes;