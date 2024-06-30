import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { lazy } from "react";
import { RouterData } from "./RouterData";

const ComingSoon = lazy(() => import("../_root/pages/ComingSoon"));
const Home = lazy(() => import("../_root/pages/Home"));

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: RouterData.home.link,
        element: <Home />,
      },
      {
        path: "/coming-soon",
        element: <ComingSoon />,
      },
    ],
  },
]);

export default AppRouter;
